import { Right } from './modules/right/Right,'
import { Left } from './modules/left/Left'
import { Center } from './modules/center/Center'

export const App = () => {
  return (
    <div className='flex min-h-screen flex-wrap'>
      <Left />
      <Center />
      <Right />
    </div>
  )
}
