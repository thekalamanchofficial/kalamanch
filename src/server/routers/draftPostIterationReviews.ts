import { handleError } from "~/app/_utils/handleError";
import prisma from "../db";
import { publicProcedure, router } from "../trpc";
import * as yup from "yup";


export const draftPostIterationReviewsRouter = router({
    saveDraftPostIterationReviewers: publicProcedure.input(yup.object({
        requesterId: yup.string().required(),
        iterationId: yup.string().required(),
        reviewers: yup.array(yup.string()).required(),
    })).mutation(async ({ input }) => {
        try {
            const { requesterId, iterationId, reviewers } = input;
            await Promise.all(
                reviewers.map((reviewerId) =>
                    prisma.draftPostIterationReviews.upsert({
                        where: {
                            iterationId_reviewerId: {
                                iterationId,
                                reviewerId,
                            },
                        },
                        update: {}, 
                        create: {
                            requesterId,
                            iterationId,
                            reviewerId,
                        },
                    })
                )
            );

            return true;
        } catch (error) {
            handleError(error);
            throw error;
        }
    }),
    getDraftPostIterationsToReview: publicProcedure.input(yup.object({
        limit: yup.number().min(1).default(5),
        skip: yup.number().min(0).default(0),
        userId: yup.string().required(),
    })).query(async ({ input }) => {
        try {
            const { limit, skip, userId } = input;
            const draftPosts = await prisma.draftPostIterationReviews.findMany({
                where: {
                    reviewerId: userId,
                },
                include: {
                    reviewer: true,
                    iteration: {
                        include: {
                            DraftPost: true,
                        },
                    },
                },
                take: limit,
                skip: skip,
                orderBy: {
                    createdAt: "desc",
                },
            });
            return draftPosts;
        } catch (error) {
            handleError(error);
            throw error;
        }
    }),
    getDraftPostIterationsSentForReview: publicProcedure.input(yup.object({
        limit: yup.number().min(1).default(5),
        skip: yup.number().min(0).default(0),
        userId: yup.string().required(),
    })).query(async ({ input }) => {
        try {
            const { limit, skip, userId } = input;
            const draftPosts = await prisma.draftPostIterationReviews.findMany({
                where: {
                    requesterId: userId,
                },
                include: {
                    requester: true,
                    iteration: {
                        include: {
                            DraftPost: true,
                        },
                    },
                },
                take: limit,
                skip: skip,
                orderBy: {
                    createdAt: "desc",
                },
            });
            return draftPosts;
        } catch (error) {
            handleError(error);
            throw error;
        }
    }),

});