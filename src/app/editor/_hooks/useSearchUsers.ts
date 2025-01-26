import { useState, useEffect, useRef } from "react"
import { debounce } from "lodash"
import { trpc } from "~/server/client"
import { UserSchema } from "~/app/(with-sidebar)/myprofile/types/types"
import { useUser } from "~/context/userContext"

type UseSearchUsersReturn = {
  searchTerm: string
  users: UserSchema[]
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  secondLastUserRef: React.RefObject<HTMLDivElement>
}

export const useSearchUsers = (): UseSearchUsersReturn => {
  const limit = 20
  const { user } = useUser()  
  const [users, setUsers] = useState<UserSchema[]>([])
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isUserTyping, setIsUserTyping] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  
  const { data } = trpc.user.searchUsersSortedByFollowing.useQuery(
    { searchTerm, skip, limit, userFollowing: user?.following ?? [] },
    { enabled: !isUserTyping }
  )

  const secondLastUserRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (data) {
      if (data.length < limit) {
        setHasMore(false)
      }
      setUsers((prev) =>{
        const existingUserIds = new Set(prev.map((user) => user.id));
        const newUsers = data.filter((user) => !existingUserIds.has(user.id));
        return prev.concat(newUsers);
      })
    }
  }, [data])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setSkip((prevSkip) => prevSkip + limit)
        }
      },
      { rootMargin: "100px" }
    )

    if (secondLastUserRef.current) {
      observer.observe(secondLastUserRef.current)
    }

    return () => {
      if (secondLastUserRef.current) {
        observer.unobserve(secondLastUserRef.current)
      }
    }
  }, [users, hasMore])

  const handleSearchChange = debounce((query: string) => {
    setIsUserTyping(false)
  }, 1000)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query)
    setIsUserTyping(true)
    setUsers([]) // Reset users for fresh search results
    setHasMore(true)
    setSkip(0) // Reset pagination
    handleSearchChange(query)
  }

  return { searchTerm,users, handleSearch, secondLastUserRef }
}
