import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ReviewAPI = createApi({
	reducerPath: 'ReviewAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_APIBASE}/api/review`,
		prepareHeaders: (headers, { getState }: any) => {
			headers.set('authorization', getState().auth.token);
			return headers;
		},
	}),
	tagTypes: ['ReviewAPI'],
	endpoints: (builder) => ({
		createReview: builder.mutation({
			query: (data) => ({
				url: `/create`,
				method: 'POST',
				body: data,
			}),
		}),
		getReviewByCompnayId: builder.query({
			query: ({id, filter, sort}) => ({
				url: `/get-reviews/${id}?search=${filter}&rating=${sort}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useCreateReviewMutation,
	useGetReviewByCompnayIdQuery,
} = ReviewAPI;
