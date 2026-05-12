import { useNavigate } from 'react-router-dom'
import ActionButton from '@/components/ActionButton'
import AnimatedJumbotron from '@/components/AnimatedJumbotron'

const jumbotronProps = {
  content: ['Dislexia', 'App'] as [string, string],
  style: 'mt-24 h-1/3',
  text: 'text-7xl lg:text-8xl',
}

export default function MainPage() {
  const navigate = useNavigate()

  return (
    <div className="h-full overflow-hidden bg-gray-200 text-center">
      <AnimatedJumbotron features={jumbotronProps} />
      <div className="grid lg:px-48 sm:mx-24 md:mx-0 gap-10 grid-cols-1 md:grid-cols-2">
        <ActionButton
          label="Iniciar"
          color="bg-blue-500"
          fontSize="text-5xl md:text-7xl p-8"
          handleAnswer={() => navigate('/children')}
        />
      </div>
    </div>
  )
}
