import { useState } from 'react'
import Select from 'react-select'
import { useAppDispatch } from '../../store/hooks'
import { selectStation } from '../../store/slice/stationSlice'
import { Maybe, Station, Stations } from '../../types'
import {
  createAddressOptions,
  createCityOptions,
  createProvinceOptions,
  Option,
} from './utils'
import { MdLocationCity } from 'react-icons/md'
import { BsFillHouseFill } from 'react-icons/bs'

interface State {
  province: Maybe<Option>
  provinces: Option[]
  city: Maybe<Option>
  cities: Option[]
  address: Maybe<Option<Station>>
  addresses: Option<Station>[]
}

interface Props {
  stations: Stations
}

export const SelectStation = ({ stations }: Props) => {
  const appDispatch = useAppDispatch()

  const [state, setState] = useState<State>(() => ({
    province: null,
    provinces: createProvinceOptions(stations),
    city: null,
    cities: [],
    address: null,
    addresses: [],
  }))

  const handleSubmit = (station: Maybe<Station>) => {
    appDispatch(selectStation(station))
  }

  const handleProvinceChange = (option: Maybe<Option>) => {
    const newCities = createCityOptions(stations, option!.value)
    setState({
      ...state,
      province: option,
      city: newCities.length === 1 ? newCities[0] : null,
      cities: newCities,
      address: null,
      addresses: [],
    })
    handleSubmit(null)
  }

  const handleCityChange = (option: Maybe<Option>) => {
    const newAddresses = createAddressOptions(stations, option!.value)
    const newAddress = newAddresses.length === 1 ? newAddresses[0] : null
    setState({
      ...state,
      city: option,
      address: newAddress,
      addresses: newAddresses,
    })
    handleSubmit(newAddress ? newAddress.value : null)
  }

  const handleAddressChange = (option: Maybe<Option<Station>>) => {
    setState({
      ...state,
      address: option,
    })
    handleSubmit(option!.value)
  }

  return (
    <div className='flex flex-auto flex-col gap-2'>
      <div className='flex flex-auto'>
        <Select
          name='province'
          placeholder='Województwo...'
          isDisabled={!state.provinces.length}
          value={state.province}
          options={state.provinces}
          onChange={handleProvinceChange}
          className='w-full'
          autoFocus
        />
      </div>
      <div className='flex flex-auto'>
        <MdLocationCity />
        <Select
          name='city'
          placeholder='Miejscowość...'
          isDisabled={!state.cities.length}
          value={state.city}
          options={state.cities}
          onChange={handleCityChange}
          className='w-full'
        />
      </div>

      <div className='flex flex-auto'>
        <Icon>
          <BsFillHouseFill />
        </Icon>
        <Select
          name='address'
          placeholder='Adres...'
          isDisabled={!state.addresses.length}
          value={state.address}
          options={state.addresses}
          onChange={handleAddressChange}
          className='w-full'
        />
      </div>
    </div>
  )
}

const Icon = ({ children }: { children: JSX.Element }) => {
  return (
    <div className='rounded-full bg-red-600 flex justify-center align-middle aspect-square'>
      <div className='relative h-1/2 w-1/2'>{children}</div>
    </div>
  )
}
