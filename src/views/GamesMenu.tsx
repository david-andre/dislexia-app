import AnimatedJumbotron from '@/components/AnimatedJumbotron'
import GridMenu from '@/components/GridMenu/GridMenu'
import LinkButton from '@/components/LinkButton'

const jumbotronProps = {
  content: ['Actividades', ''] as [string, string],
  style: 'invisible md:visible mt-6',
  text: 'text-sm md:text-7xl lg:text-8xl',
}

export default function GamesMenu() {
  return (
    <div className="h-auto text-center">
      <div className="flex justify-around mb-8">
        <LinkButton
          to="/main-page"
          label="atras"
          icon="back"
          color="bg-blue-500"
          fontSize="text-3xl sm:text-4xl mt-6 p-4"
        />
        <AnimatedJumbotron features={jumbotronProps} />
        <LinkButton
          to="/statistics"
          icon="chart"
          color="bg-yellow-500"
          fontSize="text-3xl sm:text-4xl mt-6 p-4"
        />
      </div>
      <GridMenu />
    </div>
  )
}
