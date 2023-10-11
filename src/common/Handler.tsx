import { DisplayError } from './DisplayError'
import { Spinner } from './Spinner'

interface Props {
  isLoading: boolean
  isError: boolean
  children: JSX.Element | JSX.Element[]
}

export function Handler({ isLoading, isError, children }: Props): JSX.Element {
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <DisplayError />
  }

  return <>{children}</>
}
