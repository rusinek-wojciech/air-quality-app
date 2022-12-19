import { useGetStationsQuery } from 'store/api/giosApi'
import { Handler } from 'components/common/Handler'
import { PickersContainer } from './PickersContainer'

export const Left = () => {
  const { data: stations, isLoading, isError } = useGetStationsQuery()

  return (
    <Handler isLoading={isLoading} isError={isError}>
      <h2 className='pb-2'>Wybierz stację pomiarową</h2>
      <PickersContainer stations={stations!} />
    </Handler>
  )
}
