import { useState, useMemo } from 'react'
import { BsFillHouseFill } from 'react-icons/bs'
import { MdTerrain, MdLocationCity } from 'react-icons/md'
import { useCacheMemo } from 'hooks/useCacheMemo'
import { Stations, Maybe, Station } from 'types'

import { SelectButton } from './SelectButton'
import { Selected, Option } from './types'
import {
  convertStationToSelected,
  initialSelected,
  queryProvinces,
  queryCities,
  queryAddresses,
} from './utils'

interface Props {
  stations: Stations
  onSubmit: (station: Maybe<Station>) => void
  initialStation?: Station
}

export function StationPicker({ stations, onSubmit, initialStation }: Props) {
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

  const handleProvinceChange = (province: Option) => {
    const cities = queryCities(stations, province.value)
    const city = cities.length === 1 ? cities[0] : null
    setSelected({ province, city, address: null })
    citiesCache.current = cities
    onSubmit(null)
  }

  const handleCityChange = (city: Option) => {
    const addresses = queryAddresses(stations, city.value)
    const address = addresses.length === 1 ? addresses[0] : null
    setSelected({ province, city, address })
    addressesCache.current = addresses
    const station = address ? address.value : null
    onSubmit(station)
  }

  const handleAddressChange = (address: Option<Station>) => {
    setSelected({ province, city, address })
    const station = address.value
    onSubmit(station)
  }

  return (
    <>
      <SelectButton
        name='province'
        value={province}
        placeholder='Województwo...'
        options={provinces}
        onChange={handleProvinceChange}
        color='bg-emerald-900'
      >
        <MdTerrain />
      </SelectButton>

      <SelectButton
        name='city'
        value={city}
        placeholder='Miejscowość...'
        options={cities}
        onChange={handleCityChange}
        color='bg-emerald-700'
      >
        <MdLocationCity />
      </SelectButton>

      <SelectButton
        name='address'
        value={address}
        placeholder='Adres...'
        options={addresses}
        onChange={handleAddressChange}
        color='bg-emerald-500'
      >
        <BsFillHouseFill />
      </SelectButton>
    </>
  )
}
