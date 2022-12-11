import { sortBy } from 'lodash'
import uniqBy from 'lodash/uniqBy'
import { Station, Stations } from '../../types'

export type Value = {
  value: Station
  label: string
}

export const createProvinceOptions = (stations: Stations): Value[] => {
  const unique = uniqBy(stations, (s) => s.city.commune.provinceName)
  const options = unique.map((s) => ({
    value: s,
    label: s.city.commune.provinceName,
  }))
  return sortBy(options, (o) => o.label)
}

export const createCityOptions = (
  stations: Stations,
  provinceName: string
): Value[] => {
  const filteredStations = stations.filter(
    (s) => s.city.commune.provinceName === provinceName
  )
  const unique = uniqBy(filteredStations, (s) => s.city.name)
  const options = unique.map((s) => ({
    value: s,
    label: s.city.name,
  }))
  return sortBy(options, (o) => o.label)
}

export const createAddressOptions = (
  stations: Stations,
  cityName: string
): Value[] => {
  const filteredStations = stations.filter((s) => s.city.name === cityName)
  const options = filteredStations.map((s) => ({
    value: s,
    label: s.addressStreet || s.stationName,
  }))
  return sortBy(options, (o) => o.label)
}
