import { lazy, Suspense } from 'react'
import { useAppSelector } from 'store/hooks'
import { Spinner } from 'components/common/Spinner'

const GraphSection = lazy(() =>
  import('./GraphSection').then((M) => ({
    default: M.GraphSection,
  }))
)

export const Right = () => {
  const airSensor = useAppSelector((state) => state.station.selectedAirSensor)

  return (
    <div className='flex-1 p-4 min-w-80'>
      <Suspense fallback={<Spinner />}>
        {airSensor ? (
          <GraphSection airSensor={airSensor} />
        ) : (
          <p>Wybierz czujnik</p>
        )}
      </Suspense>
    </div>
  )
}
