import { useGetStationsQuery } from '../../store/api/giosApi'
import { Handler } from '../common/Handler'
import { SelectStation } from './SelectStation'

export const Left = () => {
  const { data: stations, isLoading, isError } = useGetStationsQuery()

  return (
    <div className='flex-1 p-4 bg-slate-200 min-w-80'>
      <Handler isLoading={isLoading} isError={isError}>
        <h3 className='text-lg py-2'>Wybierz stację pomiarową</h3>
        <SelectStation stations={stations!} />
      </Handler>
    </div>
  )
}
