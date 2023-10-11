import { useGetMeasurementsBySensorIdQuery } from 'store/api/giosApi'
import { AirSensor } from 'types'
import { Handler } from 'common/Handler'
import { Graph } from './Graph'

interface Props {
  airSensor: AirSensor
}

export function GraphSection({ airSensor }: Props) {
  const {
    isLoading,
    isError,
    data: measurements,
  } = useGetMeasurementsBySensorIdQuery({
    sensorId: airSensor.id,
  })

  return (
    <Handler isLoading={isLoading} isError={isError}>
      <Graph
        title={`${airSensor.code} ${airSensor.name}`}
        measurements={measurements!}
      />
    </Handler>
  )
}
