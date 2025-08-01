import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ProductResponse } from '../../constant/product'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/product` }),
    endpoints: builder => ({
        // [GET] get product by category
        getAllProducts: builder.query<{ data: ProductResponse[] }, void>({
            query: () => ({
                url: `/`,
            }),
        }),

    }),
})

export const { useGetAllProductsQuery } = productApi
