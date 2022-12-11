import { useState } from 'react'
import { useGetStationsQuery } from '../store/api/giosApi'
import { Station } from '../types'
import { StationPicker } from './input/StationPicker'
import { StationDetails } from './StationDetails'

export const App = () => {
  const { data: stations, isLoading, isError } = useGetStationsQuery()
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)

  const handlePickStation = (station: Station) => {
    setSelectedStation(station)
  }

  console.log(selectedStation)

  return (
    <div className='flex min-h-screen flex-wrap'>
      <div className='flex-1 p-4'>
        {!!stations && (
          <StationPicker
            stations={stations}
            onPickStation={handlePickStation}
          />
        )}
      </div>
      <div className='flex-1 p-4'>
        {!!selectedStation && <StationDetails station={selectedStation} />}
      </div>
      <div className='flex-1 p-4'>tesst</div>
    </div>
  )
}
