import {
  useGetSensorsByStationIdQuery,
  useGetAirIndexByStationIdQuery,
} from '../../store/api/giosApi'
import { Station } from '../../types'
import { Handler } from '../common/Handler'
import { SensorsSection } from './SensorsSection'
import { StationSection } from './StationSection'
import { Title } from './Title'

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
  const isError = sensors.isError || airIndex.isError

  return (
    <Handler isLoading={isLoading} isError={isError}>
      <Title title={station.stationName} />
      <SensorsSection sensors={sensors.data!} airIndex={airIndex.data!} />
      <StationSection station={station} />
    </Handler>
  )
}
