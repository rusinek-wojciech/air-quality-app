import {
  useGetSensorsByStationIdQuery,
  useGetAirIndexByStationIdQuery,
} from '../../store/api/giosApi'
import { AirSensor, Station } from '../../types'
import { Handler } from '../common/Handler'
import { SensorsSection } from './SensorsSection'
import { getStationDetails } from './utilts'

interface Props {
  station: Station
  onSelectSensor: (airSensor: AirSensor) => void
}

export const StationDetails = ({ station, onSelectSensor }: Props) => {
  const sensors = useGetSensorsByStationIdQuery({
    stationId: station.id,
  })

  const airIndex = useGetAirIndexByStationIdQuery({
    stationId: station.id,
  })

  const { commune, district, provinceName, street, cityName, stationName } =
    getStationDetails(station)

  const isLoading = sensors.isLoading || airIndex.isLoading
  const isError = sensors.isError || airIndex.isError

  return (
    <Handler isLoading={isLoading} isError={isError}>
      <div>
        <h2 className='text-xl py-2'>{stationName}</h2>
      </div>
      <div>
        <h3 className='text-lg py-2'>Informacje o stacji pomiarowej</h3>
        <div>
          <p>Województwo: {provinceName}</p>
          <p>Powiat: {district}</p>
          <p>Gmina: {commune}</p>
          <p>Miasto: {cityName}</p>
          <p>Adres: {street}</p>
        </div>
      </div>
      <SensorsSection
        sensors={sensors.data!}
        airIndex={airIndex.data!}
        onClickSensor={onSelectSensor}
      />
    </Handler>
  )
}
