import { useState } from "react"

type UseSelectedUsersReturn = {
  selectedUsers: string[]
  toggleUserSelection: (userId: string) => void
}

export const useSelectedUsers = ():UseSelectedUsersReturn => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  }

  return { selectedUsers, toggleUserSelection }
}
