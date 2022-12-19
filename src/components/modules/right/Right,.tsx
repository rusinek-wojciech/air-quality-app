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
    <Suspense fallback={<Spinner />}>
      {airSensor ? (
        <GraphSection airSensor={airSensor} />
      ) : (
        <p>Wybierz czujnik</p>
      )}
    </Suspense>
  )
}
