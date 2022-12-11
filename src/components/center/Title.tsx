interface Props {
  title: string
}

export const Title = ({ title }: Props) => {
  return <h2 className='text-xl py-2'>{title}</h2>
}
