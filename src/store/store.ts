import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { giosApi } from './api/giosApi'
import { stationSlice } from './slice/stationSlice'

export const store = configureStore({
  reducer: {
    [giosApi.reducerPath]: giosApi.reducer,
    [stationSlice.name]: stationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(giosApi.middleware)
  },
})

setupListeners(store.dispatch)
