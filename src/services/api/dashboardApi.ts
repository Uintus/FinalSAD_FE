import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TopProductsResponse, DashboardResponse } from '../../constant/dashboard'

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/dashboard` }),
  endpoints: builder => ({

    // [GET] get dashboard
    getDashboard: builder.query<{ data: DashboardResponse }, { range: string }>({
      query: (params) => ({
        url: '/',
        params,
      }),
    }),

    // [GET] get top products
    getTopProducts: builder.query<{ data: TopProductsResponse }, { range: string, sort: string, category_id: string }>({
      query: (params) => ({
        url: '/top-products',
        params,
      }),
    }),

    // [GET] get export top products
    getExportTopProducts: builder.query<{ data: TopProductsResponse }, { range: string, sort: string, category_id: string }>({
      query: (params) => ({
        url: '/export-top-products',
        params,
      }),
    }),

    
  }),
})

export const { useGetDashboardQuery, useGetTopProductsQuery } = dashboardApi
