import { memo } from 'react'
import { useGetStationsQuery } from '../../store/api/giosApi'
import { Maybe, Station } from '../../types'
import { Handler } from '../common/Handler'
import { SelectStation } from './SelectStation'

interface Props {
  onSelectStation: (station: Maybe<Station>) => void
}

export const Left = ({ onSelectStation }: Props) => {
  const { data: stations, isLoading, isError } = useGetStationsQuery()

  return (
    <div className='flex-1 p-4 bg-slate-200 min-w-80'>
      <Handler isLoading={isLoading} isError={isError}>
        <h3 className='text-lg py-2'>Wybierz stację pomiarową</h3>
        <SelectStation stations={stations!} onSelect={onSelectStation} />
      </Handler>
    </div>
  )
}

export const LeftMemo = memo(Left)
