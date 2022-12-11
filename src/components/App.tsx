import { useCallback, useState } from 'react'
import { AirSensor, Maybe, Station } from '../types'
import { RightMemo } from './right/Right,'
import { LeftMemo } from './left/Left'
import { CenterMemo } from './center/Center'

export const App = () => {
  const [selectedStation, setSelectedStation] = useState<Maybe<Station>>(null)
  const [selectedAirSensor, setSelectedAirSensor] =
    useState<Maybe<AirSensor>>(null)

  const handleSelectStation = useCallback((station: Maybe<Station>) => {
    setSelectedStation(station)
    setSelectedAirSensor(null)
  }, [])

  const handleSelectAirSensor = useCallback((airSensor: AirSensor) => {
    setSelectedAirSensor(airSensor)
  }, [])

  return (
    <div className='flex min-h-screen flex-wrap'>
      <LeftMemo onSelectStation={handleSelectStation} />
      <CenterMemo
        station={selectedStation}
        onSelectAirSensor={handleSelectAirSensor}
      />
      <RightMemo airSensor={selectedAirSensor} />
    </div>
  )
}
