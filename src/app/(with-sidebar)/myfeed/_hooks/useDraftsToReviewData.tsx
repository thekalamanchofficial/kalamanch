import { useEffect, useState } from "react";
import { useUser } from "~/context/userContext";
import { type IterationWithReviews, MyFeedTabsEnum } from "../types/types";
import config from "~/app/_config/config";
import useLazyLoading from "~/app/_hooks/useLazyLoading";
import { trpc } from "~/server/client";
import { PostStatus } from "~/app/editor/types/types";


type useDraftsToReviewDataProps = {
  activeTab: MyFeedTabsEnum;
};
type useDraftsToReviewDataReturn = {
  iterationsToReview: IterationWithReviews[];
  hasMoreDraftIterations: boolean;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleScroll: () => void;
  errorMessage: string;
  likedDraftIterations: string[];
  queryLoading: boolean;
};


type useDraftsToReviewDataType = (props: useDraftsToReviewDataProps) => useDraftsToReviewDataReturn;

const useDraftsToReviewData: useDraftsToReviewDataType = ({activeTab}) => {
  const {user} = useUser();
  const [iterationsToReview, setIterationsToReview] = useState<IterationWithReviews[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMoreDraftIterations, setHasMoreDraftIterations] = useState(true);
  const likeMutation = trpc.likes;
  const {data: likedDraftIterations} = likeMutation.getUserLikes.useQuery(
    {userEmail: user?.email ?? "", postStatus: PostStatus.DRAFT.toString().toUpperCase()},
    {enabled: Boolean(activeTab === MyFeedTabsEnum.REVIEWS && user?.id)}
  );
  const getDraftPostIterationsToReviewQuery = trpc.draftPostIterationReview.getDraftPostIterationsToReview.useQuery;
  const {data: iterationsToReviewData, error, isLoading: queryLoading} = getDraftPostIterationsToReviewQuery(
    {userId: user?.id ?? "", limit: skip == 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit, skip},
    {enabled: Boolean(activeTab === MyFeedTabsEnum.REVIEWS && user?.id && hasMoreDraftIterations)}
  );

  const { handleScroll } = useLazyLoading({
    queryLoading,
    error: error?.message ?? "",
    initialLimit: config.lazyLoading.initialLimit,
    limit: config.lazyLoading.limit,
    skip,
    setSkip,
    hasMoreData: hasMoreDraftIterations,
    setHasMoreData: setHasMoreDraftIterations,
  });

  useEffect(() => {
    if (!iterationsToReviewData) return;
    const transformedData = iterationsToReviewData.map(item => ({
      ...item.iteration,
      likes: item.iteration.likes,
      DraftPost: item.iteration.DraftPost,
    }));
    setIterationsToReview((prev) => {
      const newIterations = transformedData.filter(
      (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id)
      );
      return [...prev, ...newIterations];
    });
    setHasMoreDraftIterations(iterationsToReviewData.length >= config.lazyLoading.limit);
  }, [iterationsToReviewData]);

  return {
    iterationsToReview,
    hasMoreDraftIterations,
    skip,
    setSkip,
    queryLoading,
    handleScroll,
    errorMessage: error?.message ?? "",
    likedDraftIterations: likedDraftIterations ?? []
  };
};
export default useDraftsToReviewData;