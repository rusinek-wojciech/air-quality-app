import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AirSensor, Maybe, Station, Stations } from 'types'
import { geolocationPromise, getClosestStation } from './geolocation'

interface State {
  selectedStation: Maybe<Station>
  selectedAirSensor: Maybe<AirSensor>
  geolocation: Maybe<{
    station: Station
    distance: number
  }>
}

const initialState: State = {
  selectedStation: null,
  selectedAirSensor: null,
  geolocation: null,
}

export const setGeolocation = createAsyncThunk(
  'geolocation',
  async (stations: Stations) => {
    const position = await geolocationPromise
    return getClosestStation(stations, position)
  }
)

export const stationSlice = createSlice({
  name: 'station',
  initialState: initialState,
  reducers: {
    selectStation(state, action: PayloadAction<Maybe<Station>>) {
      state.selectedStation = action.payload
      state.selectedAirSensor = null
    },
    selectAirSensor(state, action: PayloadAction<AirSensor>) {
      state.selectedAirSensor = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setGeolocation.fulfilled, (state, action) => {
        state.geolocation = action.payload
      })
      .addCase(setGeolocation.rejected, (state) => {
        state.geolocation = null
      })
  },
})

export const { selectStation, selectAirSensor } = stationSlice.actions
