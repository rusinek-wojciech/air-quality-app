import { memo } from 'react'
import { Sensor } from '../types'

interface Props {
  sensor: Sensor
}

export const SensorDetails = ({ sensor }: Props) => {
  return (
    <div>
      <p>
        <b>{`${sensor.stationId} -> ${sensor.id}`}</b>
      </p>
      <p>{sensor.param.paramCode}</p>
      <p>{sensor.param.paramFormula}</p>
      <p>{sensor.param.paramName}</p>
    </div>
  )
}
