import clsx from 'clsx'
import { memo } from 'react'
import { IndexSensor } from './utils'

interface Props {
  indexSensor: IndexSensor
}

export const SensorDetails = ({ indexSensor }: Props) => {
  const { code, name, status } = indexSensor

  return (
    <div
      className={clsx(
        'ease-in-out duration-300 hover:scale-105 hover:cursor-pointer',
        'border-4 rounded-2xl shadow-lg w-max p-2',
        'text-neutral-200 whitespace-nowrap',
        status === 'Brak indeksu' && 'bg-gray-500 border-gray-700',
        status === 'Bardzo dobry' && 'bg-green-700 border-green-900',
        status === 'Dobry' && 'bg-green-600 border-green-800',
        status === 'Umiarkowany' && 'bg-yellow-600 border-yellow-700',
        status === 'Dostateczny' && 'bg-yellow-600 border-yellow-700',
        status === 'Zły' && 'bg-red-500 border-red-700',
        status === 'Bardzo zły' && 'bg-red-700 border-red-900'
      )}
    >
      <div className='flex flex-none flex-row '>
        <p className='basis-1/2 px-2 font-bold'>{code}</p>
        <p className='basis-1/2 px-2'>{name}</p>
      </div>
      <p className='border-neutral-300 border-b-2 m-1'></p>
      <p className='px-2 text-sm text-center'>{status}</p>
    </div>
  )
}

export const SensorDetailsMemo = memo(
  SensorDetails,
  (prev, next) => prev.indexSensor.id === next.indexSensor.id
)
