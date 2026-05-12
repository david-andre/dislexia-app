import AnimatedJumbotron from '@/components/AnimatedJumbotron'
import GridMenu from '@/components/GridMenu/GridMenu'
import LinkButton from '@/components/LinkButton'
import './game1.css'

const jumbotronProps = {
  content: ['Actividades', ''] as [string, string],
  style: 'flex-1 text-center',
  text: 'text-4xl sm:text-5xl',
}

export default function GamesMenu() {
  return (
    <div className="g1 min-h-full px-4 pt-6 pb-12">
      <div className="flex items-center justify-between mb-10">
        <LinkButton
          to="/main-page"
          icon="back"
          color="bg-blue-500 hover:bg-blue-600"
          fontSize="text-2xl p-3 min-w-[3rem] min-h-[3rem]"
          ariaLabel="Volver al menú principal"
        />
        <AnimatedJumbotron features={jumbotronProps} />
        <LinkButton
          to="/profile"
          icon="chart"
          color="bg-amber-500 hover:bg-amber-600"
          fontSize="text-2xl p-3 min-w-[3rem] min-h-[3rem]"
          ariaLabel="Ver perfil de habilidades"
        />
      </div>
      <GridMenu />
    </div>
  )
}
