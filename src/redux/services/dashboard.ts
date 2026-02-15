import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const DashboardAPI = createApi({
	reducerPath: 'DashboardAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_APIBASE}/api`,
		prepareHeaders: (headers, { getState }: any) => {
			headers.set('authorization', getState().auth.token);
			return headers;
		},
	}),
	tagTypes: ['DashboardAPI'],
	endpoints: (builder) => ({
		createJob: builder.mutation({
			query: (data) => ({
				url: `/job/create`,
				method: 'POST',
				body: data,
			}),
		}),
		createSCP: builder.mutation({
			query: (data) => ({
				url: `/training/create`,
				method: 'POST',
				body: data,
			}),
		}),
		getAllJobs: builder.query({
			query: (payload) => ({
				url: `/job/all?search=${payload.search}&mode=${payload.mode}&role=${payload.role}&page=${payload.page}&limit=${payload.limit}`,
				method: 'GET',
			}),
		}),
		getJobById: builder.query({
			query: (id) => ({
				url: `/job/details/${id}`,
				method: 'GET',
			}),
		}),
		ApplyJob: builder.mutation({
			query: (data) => ({
				url: `/job/apply`,
				method: 'POST',
				body: data
			}),
		}),
		GetApplyJobDetails: builder.query({
			query: () => ({
				url: `/job/applied-jobs-company`,
				method: 'GET',
			}),
		}),
		GetApplyJobIntershipDetails: builder.query({
			query: () => ({
				url: `/job/get-All-jobs-internships`,
				method: 'GET',
			}),
		}),
		GetCompanyPostedJobIntership: builder.query({
			query: () => ({
				url: `/job/get-All-posted-jobs-internships`,
				method: 'GET',
			}),
		}),
		GetUserListByJobId: builder.query({
			query: (id) => ({
				url: `/job/get-All-Application/${id}`,
				method: 'GET',
			}),
		}),
		getAllScp: builder.query({
			query: (payload) => ({
				url: `/training/all?search=${payload.search}&mode=${payload.mode}&role=${payload.role}&page=${payload.page}&limit=${payload.limit}`,
				method: 'GET',
			}),
		}),
		getScpById: builder.query({
			query: (id) => ({
				url: `/training/details/${id}`,
				method: 'GET',
			}),
		}),
		ApplyScp: builder.mutation({
			query: (data) => ({
				url: `/training/apply`,
				method: 'POST',
				body: data
			}),
		}),
		approveResume: builder.mutation({
			query: ({id, status}) => ({
				url: `/training/update-status/${id}`,
				method: 'POST',
				body: {status: status}
			}),
		}),
		saveJob: builder.mutation({
			query: (id) => ({
				url: `/job/save/${id}`,
				method: 'POST',
			}),
		}),
		saveSCP: builder.mutation({
			query: (id) => ({
				url: `/training/save/${id}`,
				method: 'POST',
			}),
		}),
	}),
});

export const {
	useCreateJobMutation,
	useCreateSCPMutation,
	useGetAllJobsQuery,
	useGetAllScpQuery,
	useGetJobByIdQuery,
	useGetScpByIdQuery,
	useApplyJobMutation,
	useApplyScpMutation,
	useGetApplyJobDetailsQuery,
	useGetApplyJobIntershipDetailsQuery,
	useGetCompanyPostedJobIntershipQuery,
	useGetUserListByJobIdQuery,
	useSaveJobMutation,
	useSaveSCPMutation,
	useApproveResumeMutation,
} = DashboardAPI;
