export function DisplayError() {
  return (
    <div className='flex items-center justify-center h-full'>
      <div
        className={
          'border-4 rounded-2xl shadow-lg w-max p-2 text-neutral-200 whitespace-nowrap bg-red-700 border-red-900'
        }
      >
        <p>Funkcja czasowo niedostępna</p>
      </div>
    </div>
  )
}
