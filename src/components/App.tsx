import { useState } from 'react'
import { useGetStationsQuery } from '../store/api/giosApi'
import { Maybe, Station } from '../types'
import { Graph } from './Graph'
import { StationPicker } from './input/StationPicker'
import { StationDetails } from './StationDetails'
import { IndexSensor } from './utils'

export const App = () => {
  const { data: stations, isLoading, isError } = useGetStationsQuery()
  const [selectedStation, setSelectedStation] = useState<Maybe<Station>>(null)
  const [selectedSensor, setSelectedSensor] = useState<Maybe<IndexSensor>>(null)

  const handlePickStation = (station: Maybe<Station>) => {
    setSelectedStation(station)
    setSelectedSensor(null)
  }

  const handlePickSensor = (indexSensor: IndexSensor) => {
    setSelectedSensor(indexSensor)
  }

  return (
    <div className='flex min-h-screen flex-wrap'>
      <div className='flex-1 p-4 bg-slate-200 min-w-80'>
        {!!stations && (
          <>
            <h3 className='text-lg py-2'>Wybierz stację pomiarową</h3>
            <StationPicker
              stations={stations}
              onPickStation={handlePickStation}
            />
          </>
        )}
      </div>
      <div className='flex-1 p-4 bg-slate-100 min-w-80'>
        {!!selectedStation && (
          <StationDetails
            station={selectedStation}
            onSelectSensor={handlePickSensor}
          />
        )}
      </div>
      <div className='flex-1 p-4 min-w-80'>
        {!!selectedSensor && <Graph indexSensor={selectedSensor} />}
      </div>
    </div>
  )
}
