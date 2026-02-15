import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserAPI = createApi({
	reducerPath: 'UserAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_APIBASE}/api/user`,
		prepareHeaders: (headers, { getState }: any) => {
			headers.set('authorization', getState().auth.token);
			return headers;
		},
	}),
	tagTypes: ['UserAPI'],
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => ({
				url: `/`,
				method: 'GET',
			}),
		}),
		getUserById: builder.query({
			query: (id) => ({
				url: `/${id}`,
				method: 'GET',
			}),
		}),
		updateUserProfile: builder.mutation({
			query: ({id, data}) => ({
				url: `/edit-user/${id}`,
				method: 'PUT',
				body: data,
			}),
		}),
		getSavedJob: builder.query({
			query: () => ({
				url: `/savedlist`,
				method: 'GET',
			}),
		}),
		postForgetPassword: builder.mutation({
			query: (id) => ({
				url: `/forgotpassword`,
				method: 'POST',
				body: {email: id}
			}),
		}),
		postResetPassword: builder.mutation({
			query: (data) => ({
				url: `/resetpassword`,
				method: 'POST',
				body: data
			}),
		}),
		verifyEmail: builder.query({
			query: (email) => ({
				url: `/verify/${email}`,
				method: 'GET',
			}),
		}),
		adminUserList: builder.query({
			query: () => ({
				url: `/admin/user-list`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetUserByIdQuery,
	useUpdateUserProfileMutation,
	useGetSavedJobQuery,
	usePostForgetPasswordMutation,
	usePostResetPasswordMutation,
	useVerifyEmailQuery,
	useAdminUserListQuery,
} = UserAPI;
