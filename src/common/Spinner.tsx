export function Spinner() {
  return (
    <div className='flex items-center justify-center h-full'>
      <div
        className={
          'h-16 w-16 border-4 border-t-emerald-800 rounded-full animate-spin'
        }
      ></div>
    </div>
  )
}
