import { lazy, Suspense } from 'react'
import { useAppSelector } from 'store/hooks'
import { Spinner } from 'components/common/Spinner'

const StationDetails = lazy(() =>
  import('./StationDetails').then((M) => ({ default: M.StationDetails }))
)

export const Center = () => {
  const station = useAppSelector((state) => state.station.selectedStation)

  return (
    <div className='flex-1 p-4 bg-slate-100 min-w-80'>
      {station ? (
        <Suspense fallback={<Spinner />}>
          <StationDetails station={station} />
        </Suspense>
      ) : (
        <p>Wybierz stację</p>
      )}
    </div>
  )
}
