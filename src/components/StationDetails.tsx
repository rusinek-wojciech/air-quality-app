import { useState } from 'react'
import { useGetMeasurementsBySensorIdQuery } from '../store/api/giosApi'
import { AirIndex, Sensor, Sensors, Station } from '../types'
import { SensorDetailsMemo } from './SensorDetails'
import { IndexSensor, useGetIndexSensors } from './utils'

interface Props {
  station: Station
}

export const StationDetails = ({ station }: Props) => {
  const [selectedSensor, setSelectedSensor] = useState<IndexSensor | null>(null)
  const { isLoading, isError, data } = useGetIndexSensors(station)
  const x = useGetMeasurementsBySensorIdQuery(
    { sensorId: selectedSensor?.id! },
    { skip: !selectedSensor }
  )

  const handleSensorClick = (indexSensor: IndexSensor) => () => {
    setSelectedSensor(indexSensor)
  }

  return (
    <div>
      <div>
        <h2 className='text-xl'>{station.stationName}</h2>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3 className='text-lg pb-2'>
            Czujniki dostępne na stacji pomiarowej
          </h3>

          <div className='flex flex-wrap gap-3'>
            {data!.map((indexSensor) => (
              <SensorDetailsMemo
                key={indexSensor.id}
                indexSensor={indexSensor}
                onClick={handleSensorClick(indexSensor)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const convertDateStr = (dateStr: string) => {
  const d = new Date(dateStr)
  const date = d.toLocaleDateString()
  const time = d.toLocaleTimeString()
  return `${date} ${time}`
}
