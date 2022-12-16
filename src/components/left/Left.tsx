import { useEffect, useState } from 'react'
import { useGetStationsQuery } from '../../store/api/giosApi'
import { useAppDispatch } from '../../store/hooks'
import { selectStation } from '../../store/slice/stationSlice'
import { Maybe, Station } from '../../types'
import { Handler } from '../common/Handler'
import { getClosestStation } from './location'
import { SelectStation } from './SelectStation'

export const Left = () => {
  const dispatch = useAppDispatch()

  const [geolocationStation, setGeolocationStation] = useState<Station>()

  const { data: stations, isLoading, isError } = useGetStationsQuery()

  useEffect(() => {
    if (stations) {
      navigator.geolocation.getCurrentPosition((position) => {
        const [station, distance] = getClosestStation(stations, position)
        setGeolocationStation(station)
        handleStationSubmit(station)
      })
    }
  }, [stations])

  const handleStationSubmit = (station: Maybe<Station>) => {
    dispatch(selectStation(station))
  }

  return (
    <div className='flex-1 p-4 bg-slate-200 min-w-80'>
      <Handler isLoading={isLoading} isError={isError}>
        <h3 className='text-lg py-2'>Wybierz stację pomiarową</h3>
        <SelectStation
          key={`${!geolocationStation}`}
          stations={stations!}
          onSubmit={handleStationSubmit}
          initialStation={geolocationStation}
        />
      </Handler>
    </div>
  )
}
