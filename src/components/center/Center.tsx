import { memo } from 'react'
import { AirSensor, Maybe, Station } from '../../types'
import { StationDetails } from './StationDetails'

interface Props {
  station: Maybe<Station>
  onSelectAirSensor: (airSensor: AirSensor) => void
}

export const Center = ({ station, onSelectAirSensor }: Props) => {
  return (
    <div className='flex-1 p-4 bg-slate-100 min-w-80'>
      {station ? (
        <StationDetails station={station} onSelectSensor={onSelectAirSensor} />
      ) : (
        <p>Wybierz stację</p>
      )}
    </div>
  )
}

export const CenterMemo = memo(Center)
