import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CompanyAPI = createApi({
	reducerPath: 'CompanyAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_APIBASE}/api/company`,
		prepareHeaders: (headers, { getState }: any) => {
			headers.set('authorization', getState().auth.token);
			return headers;
		},
	}),
	tagTypes: ['CompanyAPI'],
	endpoints: (builder) => ({
		getCompanyById: builder.query({
			query: (id) => ({
				url: `/${id}`,
				method: 'GET',
			}),
		}),
		updateCompanyProfile: builder.mutation({
			query: ({id, data}) => ({
				url: `/edit-company/${id}`,
				method: 'PUT',
				body: data,
			}),
		}),
		GetAllAppliedList: builder.query({
			query: (id) => ({
				url: `/get-All-Application/${id}`,
				method: 'GET',
			}),
		}),
		adminCompanyList: builder.query({
			query: () => ({
				url: `/admin/company-list`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useGetCompanyByIdQuery,
	useUpdateCompanyProfileMutation,
	useGetAllAppliedListQuery,
	useAdminCompanyListQuery,
} = CompanyAPI;
