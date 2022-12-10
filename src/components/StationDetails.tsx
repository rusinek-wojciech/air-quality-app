import {
  useGetAirIndexByStationIdQuery,
  useGetSensorsByStationIdQuery,
} from '../store/api/giosApi'
import { AirIndex, Sensor, Sensors, Station } from '../types'
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
        <h2 className='text-xl'>{station.stationName}</h2>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Details sensors={sensors.data!} airIndex={airIndex.data!} />
      )}
    </div>
  )
}

const Details = ({
  sensors,
  airIndex,
}: {
  sensors: Sensors
  airIndex: AirIndex
}) => {
  const { no2, o3, pm10, pm25, so2, st } = airIndex

  return (
    <div>
      <h3 className='text-lg pb-2 pt-2'>Indeksy jakości powietrza</h3>

      <table>
        <thead>
          <tr>
            <th>Wskaźnik</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {!!st && (
            <tr>
              <td>{st.indexCrParam}</td>
              <td>{st.indexLevelName}</td>
              <td>{convertDateStr(st.sourceDate)}</td>
            </tr>
          )}
          {!!no2 && (
            <tr>
              <td>NO2</td>
              <td>{no2.indexLevelName}</td>
              <td>{convertDateStr(no2.sourceDate)}</td>
            </tr>
          )}
          {!!o3 && (
            <tr>
              <td>O3</td>
              <td>{o3.indexLevelName}</td>
              <td>{convertDateStr(o3.sourceDate)}</td>
            </tr>
          )}
          {!!so2 && (
            <tr>
              <td>SO2</td>
              <td>{so2.indexLevelName}</td>
              <td>{convertDateStr(so2.sourceDate)}</td>
            </tr>
          )}
          {!!pm10 && (
            <tr>
              <td>PM10</td>
              <td>{pm10.indexLevelName}</td>
              <td>{convertDateStr(pm10.sourceDate)}</td>
            </tr>
          )}
          {!!pm25 && (
            <tr>
              <td>PM2,5</td>
              <td>{pm25.indexLevelName}</td>
              <td>{convertDateStr(pm25.sourceDate)}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className='text-lg pb-2'>Czujniki dostępne na stacji pomiarowej</h3>

      <div className='flex flex-wrap gap-3'>
        {sensors.map((sensor) => (
          <SensorDetailsMemo key={sensor.id} sensor={sensor} />
        ))}
      </div>
    </div>
  )
}

const convertDateStr = (dateStr: string) => {
  const d = new Date(dateStr)
  const date = d.toLocaleDateString()
  const time = d.toLocaleTimeString()
  return `${date} ${time}`
}
