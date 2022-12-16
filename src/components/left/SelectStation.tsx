import { MutableRefObject, useMemo, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select'
import { Maybe, Station, Stations } from '../../types'
import {
  queryAddresses,
  queryCities,
  queryProvinces,
  Option,
  Selected as Selected,
  initialSelected,
  convertStationToSelected,
} from './utils'
import { MdLocationCity, MdTerrain } from 'react-icons/md'
import { BsFillHouseFill } from 'react-icons/bs'
import { IconCircle } from './IconCircle'
import { useCacheMemo } from '../../hooks/useCacheMemo'

interface Props {
  stations: Stations
  onSubmit: (station: Maybe<Station>) => void
  initialStation?: Station
}

export const SelectStation = ({
  stations,
  onSubmit,
  initialStation,
}: Props) => {
  const selectProvinceRef = useRef<SelectInstance<Maybe<Option>>>(null)
  const selectCityRef = useRef<SelectInstance<Maybe<Option>>>(null)
  const selectAddressRef = useRef<SelectInstance<Maybe<Option<Station>>>>(null)

  const [{ province, city, address }, setSelected] = useState<Selected>(() =>
    initialStation ? convertStationToSelected(initialStation) : initialSelected
  )

  const provinces = useMemo(() => queryProvinces(stations), [stations])
  const [cities, citiesCache] = useCacheMemo(
    () => (province ? queryCities(stations, province.value) : []),
    [stations, province]
  )
  const [addresses, addressesCache] = useCacheMemo(
    () => (city ? queryAddresses(stations, city.value) : []),
    [stations, city]
  )

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
    const cities = queryCities(stations, option!.value)
    const city = cities.length === 1 ? cities[0] : null
    setSelected({
      province: option,
      city: city,
      address: null,
    })
    citiesCache.current = cities
    onSubmit(null)
  }

  const handleCityChange = (option: Maybe<Option>) => {
    const addresses = queryAddresses(stations, option!.value)
    const address = addresses.length === 1 ? addresses[0] : null
    setSelected({
      province,
      city: option,
      address,
    })
    addressesCache.current = addresses
    const station = address ? address.value : null
    onSubmit(station)
  }

  const handleAddressChange = (option: Maybe<Option<Station>>) => {
    setSelected({
      province,
      city,
      address: option,
    })
    onSubmit(option!.value)
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-auto gap-2'>
        <IconCircle onClick={handleProvinceClick} type='province'>
          <MdTerrain />
        </IconCircle>
        <Select
          ref={selectProvinceRef}
          name='province'
          placeholder='Województwo...'
          isDisabled={!provinces.length}
          value={province}
          options={provinces}
          onChange={handleProvinceChange}
          className='flex-1 drop-shadow-md'
          autoFocus
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
        />
      </div>
      <div className='flex flex-auto gap-2'>
        <IconCircle onClick={handleCityClick} type='city'>
          <MdLocationCity />
        </IconCircle>
        <Select
          ref={selectCityRef}
          name='city'
          placeholder='Miejscowość...'
          isDisabled={!cities.length}
          value={city}
          options={cities}
          onChange={handleCityChange}
          className='flex-1 drop-shadow-md'
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
        />
      </div>
      <div className='flex flex-auto gap-2'>
        <IconCircle onClick={handleAddressClick} type='address'>
          <BsFillHouseFill />
        </IconCircle>
        <Select
          ref={selectAddressRef}
          name='address'
          placeholder='Adres...'
          isDisabled={!addresses.length}
          value={address}
          options={addresses}
          onChange={handleAddressChange}
          className='flex-1 drop-shadow-md'
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
        />
      </div>
    </div>
  )
}
