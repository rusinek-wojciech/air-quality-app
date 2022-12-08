import {
  useGetAirIndexByStationIdQuery,
  useGetMeasurementsBySensorIdQuery,
  useGetSensorsByStationIdQuery,
  useGetStationsQuery,
} from '../store/apis/giosApi'
import './App.css'

export const App = () => {
  const { data, isLoading, isError } = useGetAirIndexByStationIdQuery({
    stationId: 52,
  })

  console.log(data)

  return (
    <div className='App'>
      <h1>Vite + React</h1>
      <div>
        <div className='card'></div>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
