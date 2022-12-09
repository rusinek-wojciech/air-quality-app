import {
  useGetAirIndexByStationIdQuery,
  useGetSensorsByStationIdQuery,
} from '../store/api/giosApi'
import { Station } from '../types'
import { AirIndexDetailsMemo } from './AirIndexDetails'
import { SensorDetailsMemo } from './SensorDetails'

interface Props {
  station: Station
}

export const StationDetails = ({ station }: Props) => {
  const sensors = useGetSensorsByStationIdQuery({
    stationId: station.id,
  })
  const airIndex = useGetAirIndexByStationIdQuery({
    stationId: station.id,
  })

  const isLoading = sensors.isLoading || airIndex.isLoading

  return (
    <div>
      <div>
        <h2>{station.stationName}</h2>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {sensors.data!.map((sensor) => (
            <SensorDetailsMemo key={sensor.id} sensor={sensor} />
          ))}
        </>
      )}
    </div>
  )
}
