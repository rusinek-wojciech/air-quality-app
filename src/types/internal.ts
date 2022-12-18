import { Maybe } from './utils'
import { Id, Date } from './api'

type IndexName =
  | 'Brak indeksu'
  | 'Bardzo dobry'
  | 'Dobry'
  | 'Umiarkowany'
  | 'Dostateczny'
  | 'Zły'
  | 'Bardzo zły'

interface SingleIndex {
  calcDate: Date
  sourceDate: Date
  indexLevelName: IndexName
}

export interface AirIndex {
  id: Id
  st?: SingleIndex & { indexCrParam: string }
  so2?: SingleIndex
  no2?: SingleIndex
  pm10?: SingleIndex
  pm25?: SingleIndex
  o3?: SingleIndex
}

export interface AirSensor {
  id: Id
  code: string
  name: string
  status: IndexName
  date: Maybe<Date>
}

export type AirSensors = AirSensor[]
