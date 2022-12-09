import { memo } from 'react'
import { Sensor } from '../types'

interface Props {
  sensor: Sensor
}

export const SensorDetails = ({ sensor }: Props) => {
  const { param } = sensor
  const { paramFormula, paramName } = param

  return (
    <div className='shadow-lg w-max whitespace-nowrap bg-green-600 border-4 border-green-800 rounded-full text-neutral-200 p-2 flex flex-none flex-row '>
      <p className='basis-1/2 px-2 font-bold'>{paramFormula}</p>
      <p className='basis-1/2 px-2'>{paramName}</p>
    </div>
  )
}

export const SensorDetailsMemo = memo(
  SensorDetails,
  (prev, next) => prev.sensor.id === next.sensor.id
)
