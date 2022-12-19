import { Right } from './modules/right/Right,'
import { Left } from './modules/left/Left'
import { Center } from './modules/center/Center'

export const App = () => {
  return (
    <div className='flex flex-wrap min-h-screen max-w-7xl mx-auto'>
      <div className='flex-1 p-4 min-w-80 bg-slate-300'>
        <Left />
      </div>
      <div className='flex-1 p-4 min-w-80 bg-slate-200 '>
        <Center />
      </div>
      <div className='flex-1 p-4 min-w-80 bg-slate-100'>
        <Right />
      </div>
    </div>
  )
}
