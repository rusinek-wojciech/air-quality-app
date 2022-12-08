type Id = number
type Date = string

export interface City {
  id: Id
  name: string
  commune: {
    communeName: string
    districtName: string
    provinceName: string
  }
}

export interface Station {
  id: Id
  stationName: string
  gegrLat: string
  gegrLon: string
  city: City
  addressStreet: string
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
  date: string
  value: number
}

export interface Measurements {
  key: string
  values: Measurement[]
}

export interface AirIndexLevel {
  id: Id
  indexLevelName: string
}

export interface AirIndex {
  id: Id
  // st
  stCalcDate: Date
  stIndexLevel: AirIndexLevel
  stSourceDataDate: Date
  stIndexStatus: boolean
  stIndexCrParam: string
  // so2
  so2CalcDate: Date
  so2IndexLevel: AirIndexLevel
  so2SourceDataDate: Date
  // no2
  no2CalcDate: Date
  no2IndexLevel: AirIndexLevel
  no2SourceDataDate: Date
  // pm10
  pm10CalcDate: Date
  pm10IndexLevel: AirIndexLevel
  pm10SourceDataDate: Date
  // pm25
  pm25CalcDate: Date
  pm25IndexLevel: AirIndexLevel
  pm25SourceDataDate: Date
  // o3
  o3CalcDate: Date
  o3IndexLevel: AirIndexLevel
  o3SourceDataDate: Date
}

export interface ErrorResponse {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
}
