import { useEffect, useReducer } from 'react'
import Select, { ActionMeta } from 'react-select'
import { Maybe, Station, Stations } from '../../types'
import {
  createAddressOptions,
  createCityOptions,
  createProvinceOptions,
  Value,
} from './utils'

type Action =
  | { type: 'province'; payload: { value: Maybe<Value>; stations: Stations } }
  | { type: 'city'; payload: { value: Maybe<Value>; stations: Stations } }
  | { type: 'address'; payload: { value: Maybe<Value>; stations: Stations } }

interface State {
  province: Maybe<Value>
  provinces: Value[]
  city: Maybe<Value>
  cities: Value[]
  address: Maybe<Value>
  addresses: Value[]
}

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action
  switch (type) {
    case 'province': {
      const newItems = createCityOptions(
        payload.stations,
        payload.value!.value.city.commune.provinceName
      )
      return {
        ...state,
        province: payload.value,
        city: newItems.length === 1 ? newItems[0] : null,
        cities: newItems,
        address: null,
        addresses: [],
      }
    }
    case 'city': {
      const newItems = createAddressOptions(
        payload.stations,
        payload.value!.value.city.name
      )
      return {
        ...state,
        city: payload.value,
        address: newItems.length === 1 ? newItems[0] : null,
        addresses: newItems,
      }
    }
    case 'address': {
      return {
        ...state,
        address: payload.value,
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

  const handleChange = (value: Maybe<Value>, meta: ActionMeta<Value>) => {
    dispatch({
      type: meta.name as Action['type'],
      payload: { value, stations },
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
