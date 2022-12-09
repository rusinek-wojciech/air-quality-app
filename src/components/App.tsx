import {
  useGetAirIndexByStationIdQuery,
  useGetMeasurementsBySensorIdQuery,
  useGetSensorsByStationIdQuery,
  useGetStationsQuery,
} from '../store/api/giosApi'
import { AirIndex, Sensor, Station } from '../types'
import { useState } from 'react'
import { SensorDetails } from './SensorDetails'

export const App = () => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const { data: stations } = useGetStationsQuery()

  const handleClick = (station: Station) => () => {
    setSelectedStation(station)
  }

  const handleClose = () => {
    setSelectedStation(null)
  }

  return (
    <div>
      <h1>Air Quality App</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Województwo</th>
              <th>Powiat</th>
              <th>Gmina</th>
              <th>Miasto</th>
              <th>Adres</th>
            </tr>
          </thead>
          <tbody>
            {!!stations
              ? stations.map((station) => (
                  <StationRow
                    key={station.id}
                    station={station}
                    onClick={handleClick(station)}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
      {!!selectedStation && (
        <Modal station={selectedStation} onClose={handleClose} />
      )}
    </div>
  )
}

const StationRow = ({
  station,
  onClick,
}: {
  station: Station
  onClick: () => void
}) => {
  const { provinceName, districtName, communeName } = station.city.commune
  const cityName = station.city.name

  const commune = cityName === communeName ? '-' : communeName
  const district = communeName === districtName ? '-' : districtName

  return (
    <tr className='cursor-pointer hover:bg-slate-300' onClick={onClick}>
      <td>{provinceName}</td>
      <td>{district}</td>
      <td>{commune}</td>
      <td>{cityName}</td>
      <td>{station.addressStreet}</td>
    </tr>
  )
}

const Modal = ({
  station,
  onClose,
}: {
  station: Station
  onClose: () => void
}) => {
  const { data: sensors } = useGetSensorsByStationIdQuery({
    stationId: station.id,
  })
  const { data: airIndex } = useGetAirIndexByStationIdQuery({
    stationId: station.id,
  })

  return (
    <div className='block fixed z-10 inset-0 overflow-y-scroll'>
      <div className='bg-slate-300 border-1 p-4'>
        <span
          className='text-slate-900 float-right font-bold text-3xl hover:cursor-pointer'
          onClick={onClose}
        >
          &times;
        </span>

        <div>
          <h2>{station.stationName}</h2>
        </div>

        {!!airIndex ? (
          <AirIndexDetails key={airIndex.id} airIndex={airIndex} />
        ) : (
          <div>Air index loading...</div>
        )}

        {!!sensors ? (
          <div>
            <h2>Sensors</h2>
            {sensors.map((sensor) => (
              <SensorDetails key={sensor.id} sensor={sensor} />
            ))}
          </div>
        ) : (
          <div>Sensors loading...</div>
        )}
      </div>
    </div>
  )
}

const AirIndexDetails = ({ airIndex }: { airIndex: AirIndex }) => {
  return (
    <div>
      <h2>Air index</h2>

      <div>
        <h3>ST</h3>
        {!!airIndex.stIndexLevel ? (
          <div>
            <p>{airIndex.stIndexLevel.indexLevelName}</p>
            <p>{airIndex.stIndexStatus}</p>
            <p>{airIndex.stIndexCrParam}</p>
            <p>
              {airIndex.stCalcDate} {airIndex.stSourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>

      <div>
        <h3>SO2</h3>
        {!!airIndex.so2IndexLevel ? (
          <div>
            <p>{airIndex.so2IndexLevel.indexLevelName}</p>
            <p>
              {airIndex.so2CalcDate} {airIndex.so2SourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>

      <div>
        <h3>NO2</h3>
        {!!airIndex.no2IndexLevel ? (
          <div>
            <p>{airIndex.no2IndexLevel.indexLevelName}</p>
            <p>
              {airIndex.no2CalcDate} {airIndex.no2SourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>

      <div>
        <h3>O3</h3>
        {!!airIndex.o3IndexLevel ? (
          <div>
            <p>{airIndex.o3IndexLevel.indexLevelName}</p>
            <p>
              {airIndex.o3CalcDate} {airIndex.o3SourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>

      <div>
        <h3>PM10</h3>
        {!!airIndex.pm10IndexLevel ? (
          <div>
            <p>{airIndex.pm10IndexLevel.indexLevelName}</p>
            <p>
              {airIndex.pm10CalcDate} {airIndex.pm10SourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>

      <div>
        <h3>PM25</h3>
        {!!airIndex.pm25IndexLevel ? (
          <div>
            <p>{airIndex.pm25IndexLevel.indexLevelName}</p>
            <p>
              {airIndex.pm25CalcDate} {airIndex.pm25SourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>
    </div>
  )
}
