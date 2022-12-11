import { Sensors, AirIndex, AirSensor } from '../../types'
import { AirSensorChip } from './AirSensorChip'
import { convertToAirSensors } from './utilts'

interface Props {
  sensors: Sensors
  airIndex: AirIndex
  onClickSensor: (sensor: AirSensor) => void
}

export const SensorsSection = ({ sensors, airIndex, onClickSensor }: Props) => {
  const airSensors = convertToAirSensors(sensors, airIndex)

  return (
    <>
      <h3 className='text-lg py-2'>Czujniki dostępne na stacji pomiarowej</h3>
      <div className='flex flex-wrap gap-3'>
        {airSensors.map((airSensor) => (
          <AirSensorChip
            key={airSensor.id}
            airSensor={airSensor}
            onClick={() => onClickSensor(airSensor)}
          />
        ))}
      </div>
    </>
  )
}
