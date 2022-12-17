import { Maybe, Station } from '../../../types'

export interface Selected {
  province: Maybe<Option>
  city: Maybe<Option>
  address: Maybe<Option<Station>>
}

export interface Values {
  provinces: Option[]
  cities: Option[]
  addresses: Option<Station>[]
}

export type Option<T = string> = {
  value: T
  label: string
}
