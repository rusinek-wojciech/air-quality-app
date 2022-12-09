import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { giosApi } from './api/giosApi'

export const store = configureStore({
  reducer: {
    [giosApi.reducerPath]: giosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(giosApi.middleware)
  },
})

setupListeners(store.dispatch)
