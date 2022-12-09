interface Props {
  onClose: () => void
  children: JSX.Element
}

export const Modal = ({ children, onClose }: Props) => {
  return (
    <div className='block fixed z-10 inset-0 overflow-y-scroll'>
      <div className='bg-slate-300 border-1 p-4'>
        <span
          className='text-slate-900 float-right font-bold text-3xl hover:cursor-pointer'
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  )
}
