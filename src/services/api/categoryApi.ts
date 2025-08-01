import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CategoryResponse } from '../../constant/category'

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/category` }),
    endpoints: builder => ({
        // [GET] get category
        getCategory: builder.query<{ data: CategoryResponse }, void>({
            query: () => ({
                url: '/',
            }),
        }),

    }),
})

export const { useGetCategoryQuery } = categoryApi
