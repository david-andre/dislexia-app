import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { UserPlus } from 'lucide-react'
import Input from './Input'

interface ModalFormProps {
  isShown: boolean
  hideModal: () => void
  handleAction: (data: Record<string, string>) => void | Promise<void>
  title: string
  button: string
  inputs: string[]
}

export default function ModalForm({
  isShown,
  hideModal,
  handleAction,
  title,
  button,
  inputs,
}: ModalFormProps) {
  const [inputValues, setInputValues] = useState<[string, string][]>([])

  useEffect(() => {
    if (isShown) {
      setInputValues(inputs.map((name) => [name, '']))
    }
  }, [isShown, inputs])

  const className = isShown ? 'fixed z-10 inset-0 overflow-y-auto' : 'hidden'

  const handleChange = (index: number, value: string) => {
    setInputValues((prev) =>
      prev.map((item, i) => (i === index ? [item[0], value] : item))
    )
  }

  const handleSubmit = async () => {
    const hasEmpty = inputValues.some(([, v]) => !v.trim())
    if (hasEmpty) {
      await Swal.fire(
        'Campos Incompletos',
        'Debe llenar todos los campos solicitados',
        'warning'
      )
      return
    }
    const data: Record<string, string> = {}
    for (const [key, val] of inputValues) {
      data[key.toLowerCase()] = val
    }
    await handleAction(data)
    hideModal()
  }

  return (
    <div
      className={className}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <UserPlus className="h-6 w-6 text-blue-500" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {title}
                </h3>
                <div className="mt-2">
                  {inputValues.map(([name, value], index) => (
                    <Input
                      key={name}
                      id={String(index)}
                      name={name}
                      placeholder={name}
                      value={value}
                      type="text"
                      onChange={(e) => handleChange(index, e.target.value)}
                      fontSize="text-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
            >
              {button}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={hideModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
