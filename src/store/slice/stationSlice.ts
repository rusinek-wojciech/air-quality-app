import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AirSensor, Maybe, Station } from 'types'

interface State {
  selectedStation: Maybe<Station>
  selectedAirSensor: Maybe<AirSensor>
}

const initialState: State = {
  selectedStation: null,
  selectedAirSensor: null,
}

export const stationSlice = createSlice({
  name: 'station',
  initialState: initialState,
  reducers: {
    selectStation: (state, action: PayloadAction<Maybe<Station>>) => {
      state.selectedStation = action.payload
      state.selectedAirSensor = null
    },
    selectAirSensor: (state, action: PayloadAction<AirSensor>) => {
      state.selectedAirSensor = action.payload
    },
  },
})

export const { selectStation, selectAirSensor } = stationSlice.actions
