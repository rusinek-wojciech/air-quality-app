import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { endpoint } from '../config'
import { AirIndex, Measurements, Sensors, Stations } from './types'

export const giosApi = createApi({
  reducerPath: 'giosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${endpoint}/`,
  }),
  endpoints: (builder) => ({
    getStations: builder.query<Stations, void>({
      query: () => 'station/findAll',
    }),
    getSensorsByStationId: builder.query<Sensors, { stationId: number }>({
      query: ({ stationId }) => `station/sensors/${stationId}`,
    }),
    getMeasurementsBySensorId: builder.query<
      Measurements,
      { sensorId: number }
    >({
      query: ({ sensorId }) => `data/getData/${sensorId}`,
    }),
    getAirIndexByStationId: builder.query<AirIndex, { stationId: number }>({
      query: ({ stationId }) => `aqindex/getIndex/${stationId}`,
    }),
  }),
})

export const {
  useGetStationsQuery,
  useGetSensorsByStationIdQuery,
  useGetMeasurementsBySensorIdQuery,
  useGetAirIndexByStationIdQuery,
} = giosApi
