export type Id = number
export type Date = string
export type Maybe<T> = T | null

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
  date: string
  value: number
}

export interface Measurements {
  key: string
  values: Measurement[]
}

export type IndexName =
  | 'Brak indeksu'
  | 'Bardzo dobry'
  | 'Dobry'
  | 'Umiarkowany'
  | 'Dostateczny'
  | 'Zły'
  | 'Bardzo zły'

export interface AirIndexLevel {
  id: -1 | 0 | 1 | 2 | 3 | 4 | 5
  indexLevelName: IndexName
}

export interface AirIndexRaw {
  id: Id
  stCalcDate: Date
  stIndexLevel: AirIndexLevel
  stSourceDataDate: Date
  stIndexStatus: boolean
  stIndexCrParam: string
  so2CalcDate: Maybe<Date>
  so2IndexLevel: Maybe<AirIndexLevel>
  so2SourceDataDate: Maybe<Date>
  no2CalcDate: Maybe<Date>
  no2IndexLevel: Maybe<AirIndexLevel>
  no2SourceDataDate: Maybe<Date>
  pm10CalcDate: Maybe<Date>
  pm10IndexLevel: Maybe<AirIndexLevel>
  pm10SourceDataDate: Maybe<Date>
  pm25CalcDate: Maybe<Date>
  pm25IndexLevel: Maybe<AirIndexLevel>
  pm25SourceDataDate: Maybe<Date>
  o3CalcDate: Maybe<Date>
  o3IndexLevel: Maybe<AirIndexLevel>
  o3SourceDataDate: Maybe<Date>
}

interface SingleIndex {
  calcDate: Date
  sourceDate: Date
  indexLevelName: IndexName
}

interface SingleIndexPlus extends SingleIndex {
  indexCrParam: string
}

export interface AirIndex {
  id: Id
  st?: SingleIndexPlus
  so2?: SingleIndex
  no2?: SingleIndex
  pm10?: SingleIndex
  pm25?: SingleIndex
  o3?: SingleIndex
}

export interface ErrorResponse {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
}

export interface AirSensor {
  id: Id
  code: string
  name: string
  status: IndexName
  date: Maybe<Date>
}

export type AirSensors = AirSensor[]
