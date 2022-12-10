import { AirIndex, Sensor, Sensors, Station } from '../types'
import { SensorDetailsMemo } from './SensorDetails'
import { IndexSensor, useGetIndexSensors } from './utils'

interface Props {
  station: Station
}

export const StationDetails = ({ station }: Props) => {
  const { isLoading, isError, data } = useGetIndexSensors(station)

  return (
    <div>
      <div>
        <h2 className='text-xl'>{station.stationName}</h2>
      </div>
      {isLoading ? <p>Loading...</p> : <Details indexSensors={data!} />}
    </div>
  )
}

const Details = ({ indexSensors }: { indexSensors: IndexSensor[] }) => {
  return (
    <div>
      <h3 className='text-lg pb-2'>Czujniki dostępne na stacji pomiarowej</h3>

      <div className='flex flex-wrap gap-3'>
        {indexSensors.map((indexSensor) => (
          <SensorDetailsMemo key={indexSensor.id} indexSensor={indexSensor} />
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
