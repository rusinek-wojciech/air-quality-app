import { lazy, Suspense } from 'react'
import { useAppSelector } from 'store/hooks'
import { Spinner } from 'components/common/Spinner'

const StationDetails = lazy(() =>
  import('./StationDetails').then((M) => ({ default: M.StationDetails }))
)

export const Center = () => {
  const station = useAppSelector((state) => state.station.selectedStation)

  return (
    <Suspense fallback={<Spinner />}>
      {station ? <StationDetails station={station} /> : <p>Wybierz stację</p>}
    </Suspense>
  )
}
