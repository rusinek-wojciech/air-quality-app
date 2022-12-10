import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { endpoint } from '../../config'
import {
  AirIndex,
  AirIndexRaw,
  Id,
  Measurements,
  Sensors,
  Stations,
} from '../../types'
import { convertAirIndex } from './utils'

type GetStationsResponse = Stations
type GetStationsPayload = void

type GetSensorsByStationIdResponse = Sensors
type GetSensorsByStationIdPayload = { stationId: Id }

type GetMeasurementsBySensorIdResponse = Measurements
type GetMeasurementsBySensorIdPayload = { sensorId: Id }

type GetAirIndexByStationIdRawResponse = AirIndexRaw
type GetAirIndexByStationIdResponse = AirIndex
type GetAirIndexByStationIdPayload = { stationId: Id }

/**
 * https://powietrze.gios.gov.pl/
 */
export const giosApi = createApi({
  reducerPath: 'giosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${endpoint}/`,
  }),
  tagTypes: ['Stations', 'Sensors', 'Measurements', 'AirIndecies'],
  endpoints: (builder) => ({
    getStations: builder.query<GetStationsResponse, GetStationsPayload>({
      query: () => 'station/findAll',
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: 'Stations' as const, id }))]
          : ['Stations']
      },
    }),
    getSensorsByStationId: builder.query<
      GetSensorsByStationIdResponse,
      GetSensorsByStationIdPayload
    >({
      query: ({ stationId }) => `station/sensors/${stationId}`,
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: 'Sensors' as const, id }))]
          : ['Sensors']
      },
    }),
    getMeasurementsBySensorId: builder.query<
      GetMeasurementsBySensorIdResponse,
      GetMeasurementsBySensorIdPayload
    >({
      query: ({ sensorId }) => `data/getData/${sensorId}`,
      providesTags: (result, _, arg) => {
        return result
          ? [{ type: 'Measurements', id: arg.sensorId }]
          : ['Measurements']
      },
    }),
    getAirIndexByStationId: builder.query<
      GetAirIndexByStationIdResponse,
      GetAirIndexByStationIdPayload
    >({
      query: ({ stationId }) => `aqindex/getIndex/${stationId}`,
      providesTags: (result) => {
        return result
          ? [{ type: 'AirIndecies', id: result.id }]
          : ['AirIndecies']
      },
      transformResponse: (response: GetAirIndexByStationIdRawResponse) => {
        return convertAirIndex(response)
      },
    }),
  }),
})

export const {
  useGetStationsQuery,
  useGetSensorsByStationIdQuery,
  useGetMeasurementsBySensorIdQuery,
  useGetAirIndexByStationIdQuery,
} = giosApi
