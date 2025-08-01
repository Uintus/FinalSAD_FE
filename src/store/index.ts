import { configureStore } from '@reduxjs/toolkit'
import { dashboardApi } from '../services/api/dashboardApi'
import { categoryApi } from '../services/api/categoryApi'
import { productApi } from '../services/api/productApi'
import { orderApi } from '../services/api/orderApi'

export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dashboardApi.middleware,
      categoryApi.middleware,
      productApi.middleware,
      orderApi.middleware
    ),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
