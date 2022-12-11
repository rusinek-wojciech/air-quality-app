import { Station, Stations } from '../../types'
import sortBy from 'lodash/sortBy'
import uniq from 'lodash/uniq'

export type Option<T = string> = {
  value: T
  label: string
}

export const createProvinceOptions = (stations: Stations): Option[] => {
  const provinces = stations.map((s) => s.city.commune.provinceName)
  return uniq(provinces)
    .sort()
    .map((s) => ({
      value: s,
      label: s,
    }))
}

export const createCityOptions = (
  stations: Stations,
  provinceName: string
): Option[] => {
  const filteredStations = stations.filter(
    (s) => s.city.commune.provinceName === provinceName
  )
  const cities = filteredStations.map((s) => s.city.name)
  return uniq(cities)
    .sort()
    .map((s) => ({
      value: s,
      label: s,
    }))
}

export const createAddressOptions = (
  stations: Stations,
  cityName: string
): Option<Station>[] => {
  const filteredStations = stations.filter((s) => s.city.name === cityName)
  const options = filteredStations.map((s) => ({
    value: s,
    label: s.addressStreet || s.stationName,
  }))
  return sortBy(options, (o) => o.label)
}
