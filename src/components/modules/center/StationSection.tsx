import { Station } from 'types'
import { getStationDetails } from './utils'

interface Props {
  station: Station
}

export const StationSection = ({ station }: Props) => {
  const { commune, district, provinceName, street, cityName } =
    getStationDetails(station)

  return (
    <div>
      <h3 className='text-lg py-2'>Informacje szczegółowe</h3>
      <div>
        <p>Województwo: {provinceName}</p>
        <p>Powiat: {district}</p>
        <p>Gmina: {commune}</p>
        <p>Miasto: {cityName}</p>
        <p>Adres: {street}</p>
      </div>
    </div>
  )
}
