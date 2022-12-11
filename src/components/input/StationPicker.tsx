import { useEffect, useMemo, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { Station, Stations } from '../../types'
import { capitalizeFirstLetter } from './utils'
import uniqBy from 'lodash/uniqBy'
import { add, sortBy } from 'lodash'

interface Props {
  stations: Stations
  onPickStation: (station: Station) => void
}

type Value = SingleValue<{
  value: Station
  label: string
}>

interface Selected {
  province: Value
  city: Value
  address: Value
}

const initial: Selected = {
  province: null,
  city: null,
  address: null,
}

export const StationPicker = ({ stations, onPickStation }: Props) => {
  const [selected, setSelected] = useState<Selected>(initial)

  const provinces = useMemo(() => {
    const optionsProvinces = uniqBy(
      stations,
      (s) => s.city.commune.provinceName
    ).map((s) => ({
      value: s,
      label: capitalizeFirstLetter(s.city.commune.provinceName),
    }))
    return sortBy(optionsProvinces, (o) => o.label)
  }, [stations])

  const cities = useMemo(() => {
    if (!selected.province) {
      return []
    }
    const filteredStations = stations.filter(
      (s) =>
        s.city.commune.provinceName ===
        selected.province?.value.city.commune.provinceName
    )
    const optionsProvinces = uniqBy(filteredStations, (s) => s.city.name).map(
      (s) => ({
        value: s,
        label: capitalizeFirstLetter(s.city.name),
      })
    )
    return sortBy(optionsProvinces, (o) => o.label)
  }, [stations, selected.province])

  const addresses = useMemo(() => {
    if (!selected.city) {
      return []
    }
    const filteredStations = stations.filter(
      (s) => s.city.name === selected.city?.value.city.name
    )
    const optionsProvinces = uniqBy(
      filteredStations,
      (s) => s.addressStreet
    ).map((s) => ({
      value: s,
      label: capitalizeFirstLetter(s.addressStreet),
    }))
    return sortBy(optionsProvinces, (o) => o.label)
  }, [stations, selected.city])

  useEffect(() => {
    if (provinces.length === 1) {
      setSelected({ ...selected, province: provinces[0] })
    }
    if (cities.length === 1) {
      setSelected({ ...selected, city: cities[0] })
    }
    if (addresses.length === 1) {
      const newSelected = { ...selected, address: addresses[0] }
      setSelected(newSelected)
      onPickStation(newSelected.address.value)
    }
  }, [addresses])

  return (
    <div>
      <Select
        autoFocus
        isDisabled={!provinces.length}
        value={selected.province}
        options={provinces}
        onChange={(e) =>
          setSelected({ ...selected, province: e, city: null, address: null })
        }
      />
      <Select
        isDisabled={!cities.length}
        value={selected.city}
        options={cities}
        onChange={(e) => setSelected({ ...selected, city: e, address: null })}
      />
      <Select
        isDisabled={!addresses.length}
        value={selected.address}
        options={addresses}
        onChange={(e) => {
          setSelected({ ...selected, address: e })
          if (e) {
            onPickStation(e.value)
          }
        }}
      />
    </div>
  )
}
