import { useRef } from 'react'
import Select, { SelectInstance } from 'react-select'
import { Maybe } from '../../../types'
import { IconCircle } from './IconCircle'
import { Option } from './types'

export const SelectButton = <T,>({
  name,
  value,
  placeholder,
  options,
  onChange,
  children,
}: {
  name: 'province' | 'city' | 'address'
  value: Maybe<Option<T>>
  placeholder: string
  options: Option<T>[]
  onChange: (option: Option<T>) => void
  children: JSX.Element
}) => {
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
      <IconCircle onClick={handleIconClick} type={name}>
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
