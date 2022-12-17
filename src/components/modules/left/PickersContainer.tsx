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
  const dispatch = useAppDispatch()

  const handleStationSubmit = (station: Maybe<Station>) => {
    dispatch(selectStation(station))
  }

  const handleLocationClick = (station: Station) => {
    // TODO: fix bug with possibility to use this station again
    handleStationSubmit(station)
    setInitialStation(station)
  }

  return (
    <div className='flex flex-col gap-2'>
      <LocationButton stations={stations} onClick={handleLocationClick} />
      <StationPicker
        key={`${!initialStation}`}
        stations={stations!}
        onSubmit={handleStationSubmit}
        initialStation={initialStation}
      />
    </div>
  )
}
