import { useAppSelector } from '../../store/hooks'
import { StationDetails } from './StationDetails'

export const Center = () => {
  const station = useAppSelector((state) => state.station.selectedStation)

  return (
    <div className='flex-1 p-4 bg-slate-100 min-w-80'>
      {station ? <StationDetails station={station} /> : <p>Wybierz stację</p>}
    </div>
  )
}
