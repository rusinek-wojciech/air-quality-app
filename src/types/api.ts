import { Maybe } from './utils'

export type Id = number
export type Date = string

export interface Commune {
  communeName: string
  districtName: string
  provinceName: string
}

export interface City {
  id: Id
  name: string
  commune: Commune
}

export interface Station {
  id: Id
  stationName: string
  gegrLat: string
  gegrLon: string
  city: City
  addressStreet: Maybe<string>
}

export type Stations = Station[]

export interface SensorParam {
  paramName: string
  paramFormula: string
  paramCode: string
  idParam: Id
}

export interface Sensor {
  id: Id
  stationId: Id
  param: SensorParam
}

export type Sensors = Sensor[]

export interface Measurement {
  date: Date
  value: number
}

export interface Measurements {
  key: string
  values: Measurement[]
}

export type AirIndexLevel =
  | {
      id: -1
      indexLevelName: 'Brak indeksu'
    }
  | {
      id: 0
      indexLevelName: 'Bardzo dobry'
    }
  | {
      id: 1
      indexLevelName: 'Dobry'
    }
  | {
      id: 2
      indexLevelName: 'Umiarkowany'
    }
  | {
      id: 3
      indexLevelName: 'Dostateczny'
    }
  | {
      id: 4
      indexLevelName: 'Zły'
    }
  | {
      id: 5
      indexLevelName: 'Bardzo zły'
    }

type StIndex = {
  stCalcDate: Date
  stIndexLevel: AirIndexLevel
  stSourceDataDate: Date
  stIndexStatus: boolean
  stIndexCrParam: string
}

type So2Index =
  | { so2CalcDate: Date; so2IndexLevel: AirIndexLevel; so2SourceDataDate: Date }
  | { so2CalcDate: null; so2IndexLevel: null; so2SourceDataDate: null }

type No2Index =
  | { no2CalcDate: Date; no2IndexLevel: AirIndexLevel; no2SourceDataDate: Date }
  | { no2CalcDate: null; no2IndexLevel: null; no2SourceDataDate: null }

type Pm10Index =
  | {
      pm10CalcDate: Date
      pm10IndexLevel: AirIndexLevel
      pm10SourceDataDate: Date
    }
  | { pm10CalcDate: null; pm10IndexLevel: null; pm10SourceDataDate: null }

type Pm25Index =
  | {
      pm25CalcDate: Date
      pm25IndexLevel: AirIndexLevel
      pm25SourceDataDate: Date
    }
  | { pm25CalcDate: null; pm25IndexLevel: null; pm25SourceDataDate: null }

type O3Index =
  | { o3CalcDate: Date; o3IndexLevel: AirIndexLevel; o3SourceDataDate: Date }
  | { o3CalcDate: null; o3IndexLevel: null; o3SourceDataDate: null }

export type AirIndexRaw = { id: Id } & StIndex &
  So2Index &
  No2Index &
  Pm10Index &
  Pm25Index &
  O3Index

export interface ErrorResponse {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
}
