import { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select'
import { useAppDispatch } from '../../store/hooks'
import { selectStation } from '../../store/slice/stationSlice'
import { Maybe, Station, Stations } from '../../types'
import {
  createAddressOptions,
  createCityOptions,
  createProvinceOptions,
  Option,
} from './utils'
import { MdLocationCity, MdTerrain } from 'react-icons/md'
import { BsFillHouseFill } from 'react-icons/bs'
import clsx from 'clsx'
import { IconCircle } from './IconCircle'
import { getClosestStation } from './location'

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

  const selectProvinceRef = useRef<SelectInstance<Maybe<Option>>>(null)
  const selectCityRef = useRef<SelectInstance<Maybe<Option>>>(null)
  const selectAddressRef = useRef<SelectInstance<Maybe<Option<Station>>>>(null)

  const [state, setState] = useState<State>(() => ({
    province: null,
    provinces: createProvinceOptions(stations),
    city: null,
    cities: [],
    address: null,
    addresses: [],
  }))

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const [station, distance] = getClosestStation(stations, position)
        console.log(`${station.city.name} - ${distance}`)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [stations])

  const handleSubmit = (station: Maybe<Station>) => {
    appDispatch(selectStation(station))
  }

  const handleProvinceClick = () => {
    const e = selectProvinceRef.current!
    if (!e.props.isDisabled) {
      e.focus()
      e.openMenu('last')
    }
  }

  const handleCityClick = () => {
    const e = selectCityRef.current!
    if (!e.props.isDisabled) {
      e.focus()
      e.openMenu('last')
    }
  }

  const handleAddressClick = () => {
    const e = selectAddressRef.current!
    if (!e.props.isDisabled) {
      e.focus()
      e.openMenu('last')
    }
  }

  const handleProvinceChange = (option: Maybe<Option>) => {
    const newCities = createCityOptions(stations, option!.value)
    const newCity = newCities.length === 1 ? newCities[0] : null
    setState({
      ...state,
      province: option,
      city: newCity,
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
    <div className='flex flex-col gap-2'>
      <div className='flex flex-auto gap-2 cursor-pointer'>
        <IconCircle onClick={handleProvinceClick} type='province'>
          <MdTerrain />
        </IconCircle>
        <Select
          ref={selectProvinceRef}
          name='province'
          placeholder='Województwo...'
          isDisabled={!state.provinces.length}
          value={state.province}
          options={state.provinces}
          onChange={handleProvinceChange}
          className='flex-1 drop-shadow-md'
          autoFocus
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
        />
      </div>
      <div className='flex flex-auto gap-2 cursor-pointer'>
        <IconCircle onClick={handleCityClick} type='city'>
          <MdLocationCity />
        </IconCircle>
        <Select
          ref={selectCityRef}
          name='city'
          placeholder='Miejscowość...'
          isDisabled={!state.cities.length}
          value={state.city}
          options={state.cities}
          onChange={handleCityChange}
          className='flex-1 drop-shadow-md'
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
        />
      </div>
      <div className='flex flex-auto gap-2 cursor-pointer'>
        <IconCircle onClick={handleAddressClick} type='address'>
          <BsFillHouseFill />
        </IconCircle>
        <Select
          ref={selectAddressRef}
          name='address'
          placeholder='Adres...'
          isDisabled={!state.addresses.length}
          value={state.address}
          options={state.addresses}
          onChange={handleAddressChange}
          className='flex-1 drop-shadow-md'
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
        />
      </div>
    </div>
  )
}
