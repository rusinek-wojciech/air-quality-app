import { memo } from 'react'
import { AirSensor, Maybe } from '../../types'
import { GraphSection } from './GraphSection'

export const Right = ({ airSensor }: { airSensor: Maybe<AirSensor> }) => {
  return (
    <div className='flex-1 p-4 min-w-80'>
      {airSensor ? (
        <GraphSection airSensor={airSensor} />
      ) : (
        <p>Wybierz czujnik</p>
      )}
    </div>
  )
}

export const RightMemo = memo(Right)
