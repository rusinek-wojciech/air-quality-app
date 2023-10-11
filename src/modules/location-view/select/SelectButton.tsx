import { useRef } from 'react'
import Select, { SelectInstance } from 'react-select'
import { Maybe } from 'types'
import { IconCircle } from 'common/IconCircle'
import { Option } from './types'

interface Props<T> {
  name: string
  value: Maybe<Option<T>>
  placeholder: string
  options: Option<T>[]
  children: JSX.Element
  color: string
  onChange: (option: Option<T>) => void
}

export function SelectButton<T>({
  name,
  value,
  placeholder,
  options,
  children,
  color,
  onChange,
}: Props<T>) {
  const selectRef = useRef<SelectInstance<Maybe<Option<T>>>>(null)

  const handleIconClick = () => {
    const e = selectRef.current!
    if (!e.props.isDisabled) {
      e.focus()
      e.openMenu('last')
    }
  }

  const handleChange = (option: Maybe<Option<T>>) => {
    if (option) {
      onChange(option)
    }
  }

  return (
    <div className='flex flex-auto gap-2'>
      <IconCircle onClick={handleIconClick} className={color}>
        {children}
      </IconCircle>
      <Select
        ref={selectRef}
        name={name}
        placeholder={placeholder}
        isDisabled={!options.length}
        value={value}
        options={options}
        onChange={handleChange}
        className='flex-1 drop-shadow-md'
        menuPortalTarget={document.body}
        menuPosition={'fixed'}
      />
    </div>
  )
}
