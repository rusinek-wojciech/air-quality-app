import clsx from 'clsx'
import { AirSensor } from '../../types'

interface Props {
  airSensor: AirSensor
  onClick: () => void
  className?: string
}

export const AirSensorChip = ({ airSensor, onClick, className }: Props) => {
  const { code, name, status } = airSensor

  return (
    <div
      onClick={onClick}
      className={clsx(
        'ease-in-out duration-300 hover:scale-105 hover:cursor-pointer',
        'border-4 rounded-2xl shadow-lg w-max p-1',
        'text-neutral-200 whitespace-nowrap',
        status === 'Brak indeksu' && 'bg-gray-500 border-gray-700',
        status === 'Bardzo dobry' && 'bg-green-700 border-green-900',
        status === 'Dobry' && 'bg-green-600 border-green-800',
        status === 'Umiarkowany' && 'bg-yellow-600 border-yellow-700',
        status === 'Dostateczny' && 'bg-yellow-600 border-yellow-700',
        status === 'Zły' && 'bg-red-500 border-red-700',
        status === 'Bardzo zły' && 'bg-red-700 border-red-900',
        className
      )}
    >
      <div className='flex flex-none flex-row text-sm'>
        <p className='basis-1/2 px-2 font-bold text-left'>{code}</p>
        <p className='basis-1/2 px-2 text-right'>{name}</p>
      </div>
      <p className='border-neutral-300 border-b-2 m-1'></p>
      <p className='px-2 text-xs text-center'>{status}</p>
    </div>
  )
}
