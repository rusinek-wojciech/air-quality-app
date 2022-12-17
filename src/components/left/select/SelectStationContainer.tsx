import { useMemo, useState } from 'react'
import { Maybe, Station, Stations } from '../../../types'
import { MdLocationCity, MdTerrain } from 'react-icons/md'
import { BsFillHouseFill } from 'react-icons/bs'
import { useCacheMemo } from '../../../hooks/useCacheMemo'
import { SelectButton } from './SelectButton'
import {
  queryAddresses,
  queryCities,
  queryProvinces,
  initialSelected,
  convertStationToSelected,
} from './utils'
import { Selected, Option } from './types'

interface Props {
  stations: Stations
  onSubmit: (station: Maybe<Station>) => void
  initialStation?: Station
}

export const SelectStationContainer = ({
  stations,
  onSubmit,
  initialStation,
}: Props) => {
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

  const handleProvinceChange = (option: Option) => {
    const provinceName = option.value
    const cities = queryCities(stations, provinceName)
    const city = cities.length === 1 ? cities[0] : null
    setSelected({ province: option, city: city, address: null })
    citiesCache.current = cities
    onSubmit(null)
  }

  const handleCityChange = (option: Option) => {
    const cityName = option.value
    const addresses = queryAddresses(stations, cityName)
    const address = addresses.length === 1 ? addresses[0] : null
    setSelected({ province, city: option, address })
    addressesCache.current = addresses
    const station = address ? address.value : null
    onSubmit(station)
  }

  const handleAddressChange = (option: Option<Station>) => {
    setSelected({ province, city, address: option })
    const station = option.value
    onSubmit(station)
  }

  return (
    <div className='flex flex-col gap-2'>
      <SelectButton
        name='province'
        value={province}
        placeholder='Województwo...'
        options={provinces}
        onChange={handleProvinceChange}
      >
        <MdTerrain />
      </SelectButton>
      <SelectButton
        name='city'
        value={city}
        placeholder='Miejscowość...'
        options={cities}
        onChange={handleCityChange}
      >
        <MdLocationCity />
      </SelectButton>
      <SelectButton
        name='address'
        value={address}
        placeholder='Adres...'
        options={addresses}
        onChange={handleAddressChange}
      >
        <BsFillHouseFill />
      </SelectButton>
    </div>
  )
}
