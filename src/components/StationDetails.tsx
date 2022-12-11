import { Station } from '../types'
import { SensorDetailsMemo } from './SensorDetails'
import { IndexSensor, useGetIndexSensors } from './utils'

interface Props {
  station: Station
  onSelectSensor: (indexSensor: IndexSensor) => void
}

export const StationDetails = ({ station, onSelectSensor }: Props) => {
  const { isLoading, isError, data } = useGetIndexSensors(station)

  const { provinceName, districtName, communeName } = station.city.commune
  const cityName = station.city.name

  const commune = cityName === communeName ? '-' : communeName
  const district = communeName === districtName ? '-' : districtName
  const street = station.addressStreet ?? '-'

  const handleSelectSensor = (indexSensor: IndexSensor) => (): void =>
    onSelectSensor(indexSensor)

  return (
    <div>
      <div>
        <h2 className='text-xl py-2'>{station.stationName}</h2>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3 className='text-lg py-2'>Informacje o stacji pomiarowej</h3>
          <div>
            <p>Województwo: {provinceName}</p>
            <p>Powiat: {district}</p>
            <p>Gmina: {commune}</p>
            <p>Miasto: {cityName}</p>
            <p>Adres: {street}</p>
          </div>

          <h3 className='text-lg py-2'>
            Czujniki dostępne na stacji pomiarowej
          </h3>

          <div className='flex flex-wrap gap-3'>
            {data!.map((indexSensor) => (
              <SensorDetailsMemo
                key={indexSensor.id}
                indexSensor={indexSensor}
                onClick={handleSelectSensor(indexSensor)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
