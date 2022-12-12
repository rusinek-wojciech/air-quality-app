import { Right } from './right/Right,'
import { Left } from './left/Left'
import { Center } from './center/Center'

export const App = () => {
  return (
    <div className='flex min-h-screen flex-wrap'>
      <Left />
      <Center />
      <Right />
    </div>
  )
}
