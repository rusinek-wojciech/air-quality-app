import { useAppDispatch } from '../../store/hooks'
import { selectAirSensor } from '../../store/slice/stationSlice'
import { Sensors, AirIndex, AirSensor } from '../../types'
import { AirSensorChip } from './AirSensorChip'
import { convertToAirSensors } from './utilts'

interface Props {
  sensors: Sensors
  airIndex: AirIndex
}

export const SensorsSection = ({ sensors, airIndex }: Props) => {
  const dispatch = useAppDispatch()

  const handleAirSensorChipClick = (airSensor: AirSensor) => {
    dispatch(selectAirSensor(airSensor))
  }

  const airSensors = convertToAirSensors(sensors, airIndex)

  return (
    <>
      <h3 className='text-lg py-2'>Czujniki dostępne na stacji pomiarowej</h3>
      <div className='flex flex-wrap gap-2'>
        {airSensors.map((airSensor) => (
          <AirSensorChip
            key={airSensor.id}
            airSensor={airSensor}
            onClick={() => handleAirSensorChipClick(airSensor)}
            className='grow'
          />
        ))}
      </div>
    </>
  )
}
