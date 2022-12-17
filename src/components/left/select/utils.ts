import { Station, Stations } from '../../../types'
import sortBy from 'lodash/sortBy'
import uniq from 'lodash/uniq'
import { Selected, Option } from './types'

export const initialSelected: Selected = {
  province: null,
  city: null,
  address: null,
}

const createProvinceOption = (province: string): Option => {
  return { value: province, label: province }
}

const createCityOption = (city: string): Option => {
  return { value: city, label: city }
}

const createAddressOption = (station: Station): Option<Station> => {
  return { value: station, label: station.addressStreet || station.stationName }
}

export const queryProvinces = (stations: Stations): Option[] => {
  const provinces = stations.map((s) => s.city.commune.provinceName)
  return uniq(provinces).sort().map(createProvinceOption)
}

export const queryCities = (stations: Stations, province: string): Option[] => {
  const filteredStations = stations.filter(
    (s) => s.city.commune.provinceName === province
  )
  const cities = filteredStations.map((s) => s.city.name)
  return uniq(cities).sort().map(createCityOption)
}

export const queryAddresses = (
  stations: Stations,
  city: string
): Option<Station>[] => {
  const filteredStations = stations.filter((s) => s.city.name === city)
  const options = filteredStations.map(createAddressOption)
  return sortBy(options, (o) => o.label)
}

export const convertStationToSelected = (station: Station): Selected => {
  return {
    province: createProvinceOption(station.city.commune.provinceName),
    city: createCityOption(station.city.name),
    address: createAddressOption(station),
  }
}
