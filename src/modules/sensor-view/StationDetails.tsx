import {
  useGetSensorsByStationIdQuery,
  useGetAirIndexByStationIdQuery,
} from 'store/api/giosApi'
import { Station } from 'types'
import { Handler } from 'common'

import { SensorsSection } from './SensorsSection'

interface Props {
  station: Station
}

export function StationDetails({ station }: Props) {
  const sensors = useGetSensorsByStationIdQuery({
    stationId: station.id,
  })

  const airIndex = useGetAirIndexByStationIdQuery({
    stationId: station.id,
  })

  const isLoading = sensors.isLoading || airIndex.isLoading
  const isError = sensors.isError || airIndex.isError

  return (
    <Handler isLoading={isLoading} isError={isError}>
      <h2 className='pb-2'>{station.stationName}</h2>
      <SensorsSection sensors={sensors.data!} airIndex={airIndex.data!} />
    </Handler>
  )
}
