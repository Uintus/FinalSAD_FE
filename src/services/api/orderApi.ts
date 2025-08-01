import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { OrderFormRequest } from '../../constant/fakeOrder';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/order`, 
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation<{ message: string }, OrderFormRequest>({
            query: (payload) => ({
                url: '/',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});

export const { useCreateOrderMutation } = orderApi;
