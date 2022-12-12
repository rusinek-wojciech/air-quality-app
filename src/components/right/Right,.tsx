import { useAppSelector } from '../../store/hooks'
import { GraphSection } from './GraphSection'

export const Right = () => {
  const airSensor = useAppSelector((state) => state.station.selectedAirSensor)

  return (
    <div className='flex-1 p-4 min-w-80'>
      {airSensor ? (
        <GraphSection airSensor={airSensor} />
      ) : (
        <p>Wybierz czujnik</p>
      )}
    </div>
  )
}
