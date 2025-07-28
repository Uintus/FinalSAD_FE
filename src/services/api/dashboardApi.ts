import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { DashboardGetResponse } from '../../constant/dashboard'

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: builder => ({
    getDashboard: builder.query<DashboardGetResponse, { range: string }>({
      query: (params) => ({
        url: 'dashboard',
        params,
      }),
    }),
  }),
})

export const { useGetDashboardQuery } = dashboardApi
