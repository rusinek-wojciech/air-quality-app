import { Maybe, Station, Stations } from 'types'
import { LocationButton } from 'components/modules/left/LocationButton'
import { StationPicker } from 'components/modules/left/select/StationPicker'
import { useAppDispatch } from 'store/hooks'
import { selectStation } from 'store/slice/stationSlice'
import { useState } from 'react'

interface Props {
  stations: Stations
}

export const PickersContainer = ({ stations }: Props) => {
  const [initialStation, setInitialStation] = useState<Station>()
  const [key, setKey] = useState<number>(0)
  const dispatch = useAppDispatch()

  const handleStationSubmit = (station: Maybe<Station>) => {
    dispatch(selectStation(station))
  }

  const handleLocationClick = (station: Station) => {
    handleStationSubmit(station)
    setInitialStation(station)
    setKey(key + 1)
  }

  return (
    <div className='flex flex-col gap-2'>
      <StationPicker
        key={key}
        stations={stations}
        onSubmit={handleStationSubmit}
        initialStation={initialStation}
      />
      <LocationButton stations={stations} onClick={handleLocationClick} />
    </div>
  )
}
