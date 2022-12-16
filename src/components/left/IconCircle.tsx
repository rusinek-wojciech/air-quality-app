import clsx from 'clsx'

interface Props {
  children: JSX.Element
  onClick: () => void
  type: 'province' | 'city' | 'address'
}

export const IconCircle = ({ children, onClick, type }: Props) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        '[&>*]:hover:text-gray-200',
        '[&>*]:w-2/3 [&>*]:h-2/3 [&>*]:text-white',
        'flex justify-center items-center',
        'shadow-md rounded-full h-9 w-9 flex-initial cursor-pointer',
        type === 'province' && 'bg-emerald-900',
        type === 'city' && 'bg-emerald-700',
        type === 'address' && 'bg-emerald-500'
      )}
    >
      {children}
    </div>
  )
}
