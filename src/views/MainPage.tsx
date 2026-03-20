import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ActionButton from '@/components/ActionButton'
import AnimatedJumbotron from '@/components/AnimatedJumbotron'
import ModalForm from '@/components/ModalForm'
import ModalList from '@/components/ModalList'
import { useAuthStore } from '@/stores/authStore'

// TODO: Re-enable when backend is running at VITE_API_URL
// import { api } from '@/lib/api'

const jumbotronProps = {
  content: ['Dislexia', 'App'] as [string, string],
  style: 'mt-24 h-1/3',
  text: 'text-7xl lg:text-8xl',
}

const MOCK_CHILD = { id: 'dev-child', nombre: 'Niño demo', apellido: '' }

export default function MainPage() {
  const [showRegister, setShowRegister] = useState(false)
  const [showSelect, setShowSelect] = useState(false)
  const setSelectedChild = useAuthStore((s) => s.setSelectedChild)
  const navigate = useNavigate()

  const register = async (_data: Record<string, string>) => {
    // TODO: Re-enable when backend is running
    // const supervisorId = user?.id ?? ''
    // try {
    //   await api.post('/api/user/children', { ...data, supervisor: supervisorId })
    //   await Swal.fire('Registro exitoso', 'Niño registrado correctamente', 'success')
    //   setShowRegister(false)
    // } catch (err) {
    //   console.error(err)
    //   await Swal.fire('Ocurrió un problema', 'Inténtalo más tarde', 'error')
    // }
    await Swal.fire('Registro exitoso', 'Niño registrado (modo demo)', 'success')
    setShowRegister(false)
  }

  const goToGames = () => {
    setSelectedChild(MOCK_CHILD)
    navigate('/games')
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-200 text-center">
      <AnimatedJumbotron features={jumbotronProps} />
      <div className="grid lg:px-48 sm:mx-24 md:mx-0 gap-10 grid-cols-1 md:grid-cols-2">
        <ActionButton
          label="Iniciar"
          color="bg-blue-500"
          fontSize="text-5xl md:text-7xl p-8"
          handleAnswer={goToGames}
        />
        <ActionButton
          label="Registro"
          color="bg-red-500"
          fontSize="text-5xl md:text-7xl p-8"
          handleAnswer={() => setShowRegister(true)}
        />
      </div>
      <ModalForm
        isShown={showRegister}
        hideModal={() => setShowRegister(false)}
        handleAction={register}
        title="Registrar Niño"
        button="Registrar"
        inputs={['Nombre', 'Apellido', 'Edad']}
      />
      <ModalList
        isShown={showSelect}
        hideModal={() => setShowSelect(false)}
        title="Selecciona al niño"
        button="Confirmar"
      />
    </div>
  )
}
