import {
  useGetAirIndexByStationIdQuery,
  useGetMeasurementsBySensorIdQuery,
  useGetSensorsByStationIdQuery,
  useGetStationsQuery,
} from '../store/apis/giosApi'
import './App.css'
import { Station } from '../store/apis/types'

export const App = () => {
  const { data: stations } = useGetStationsQuery()

  return (
    <div className='App'>
      <h1>Vite + React</h1>
      <div>
        <table>
          <tr>
            <th>Województwo</th>
            <th>Powiat</th>
            <th>Gmina</th>
            <th>Miasto</th>
            <th>Adres</th>
          </tr>
          {!!stations
            ? stations.map((station) => <StationCard station={station} />)
            : null}
        </table>
      </div>
    </div>
  )
}

const StationCard = ({ station }: { station: Station }) => {
  const { provinceName, districtName, communeName } = station.city.commune
  const cityName = station.city.name

  const commune = cityName === communeName ? '-' : communeName
  const district = communeName === districtName ? '-' : districtName

  return (
    <tr>
      <td>{provinceName}</td>
      <td>{district}</td>
      <td>{commune}</td>
      <td>{cityName}</td>
      <td>{station.addressStreet}</td>
    </tr>
  )
}
