import { useEffect, useReducer } from 'react'
import Select, { ActionMeta } from 'react-select'
import { Maybe, Station, Stations } from '../../types'
import {
  createAddressOptions,
  createCityOptions,
  createProvinceOptions,
  Option,
} from './utils'

type Action =
  | { type: 'province'; payload: { option: Option; stations: Stations } }
  | { type: 'city'; payload: { option: Option; stations: Stations } }
  | {
      type: 'address'
      payload: { option: Option<Station>; stations: Stations }
    }

interface State {
  province: Maybe<Option>
  provinces: Option[]
  city: Maybe<Option>
  cities: Option[]
  address: Maybe<Option<Station>>
  addresses: Option<Station>[]
}

const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case 'province': {
      const newItems = createCityOptions(payload.stations, payload.option.value)
      return {
        ...state,
        province: payload.option,
        city: newItems.length === 1 ? newItems[0] : null,
        cities: newItems,
        address: null,
        addresses: [],
      }
    }
    case 'city': {
      const newItems = createAddressOptions(
        payload.stations,
        payload.option.value
      )
      return {
        ...state,
        city: payload.option,
        address: newItems.length === 1 ? newItems[0] : null,
        addresses: newItems,
      }
    }
    case 'address': {
      return {
        ...state,
        address: payload.option,
      }
    }
  }
}

interface Props {
  stations: Stations
  onPickStation: (station: Maybe<Station>) => void
}

export const StationPicker = ({ stations, onPickStation }: Props) => {
  const [{ province, provinces, city, cities, address, addresses }, dispatch] =
    useReducer(reducer, {
      province: null,
      provinces: createProvinceOptions(stations),
      city: null,
      cities: [],
      address: null,
      addresses: [],
    })

  useEffect(() => {
    onPickStation(address ? address.value : null)
  }, [address])

  const handleChange = (
    option: Maybe<Option> | Maybe<Option<Station>>,
    meta: ActionMeta<Option> | ActionMeta<Option<Station>>
  ) => {
    dispatch({
      type: meta.name as Action['type'],
      payload: { option, stations } as any,
    })
  }

  return (
    <div>
      <Select
        name='province'
        isDisabled={!provinces.length}
        value={province}
        options={provinces}
        onChange={handleChange}
        autoFocus
      />
      <Select
        name='city'
        isDisabled={!cities.length}
        value={city}
        options={cities}
        onChange={handleChange}
      />
      <Select
        name='address'
        isDisabled={!addresses.length}
        value={address}
        options={addresses}
        onChange={handleChange}
      />
    </div>
  )
}
