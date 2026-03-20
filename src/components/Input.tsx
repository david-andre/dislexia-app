import type { InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  fontSize?: string
}

export default function Input({
  fontSize = 'text-base',
  ...props
}: InputProps) {
  const className = `focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full ${fontSize} text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-5 my-3`

  return (
    <input
      className={className}
      autoComplete="off"
      required
      {...props}
    />
  )
}
