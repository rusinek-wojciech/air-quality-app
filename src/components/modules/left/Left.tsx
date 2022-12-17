import { useGetStationsQuery } from 'store/api/giosApi'
import { Handler } from 'components/common/Handler'
import { PickersContainer } from './PickersContainer'

export const Left = () => {
  const { data: stations, isLoading, isError } = useGetStationsQuery()

  return (
    <div className='flex-1 p-4 bg-slate-200 min-w-80'>
      <Handler isLoading={isLoading} isError={isError}>
        <h3 className='text-lg py-2'>Wybierz stację pomiarową</h3>
        <PickersContainer stations={stations!} />
      </Handler>
    </div>
  )
}
