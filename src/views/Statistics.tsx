import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import LinkButton from '@/components/LinkButton'
import { useReports } from '@/hooks/useReports'
import AnimatedJumbotron from '@/components/AnimatedJumbotron'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const jumbotronProps = {
  content: ['Estadísticas', ''] as [string, string],
  style: 'invisible md:visible mt-6',
  text: 'flex-1 text-sm md:text-7xl lg:text-8xl',
}

export default function Statistics() {
  const { data: reports = [] } = useReports()

  const chartData = {
    labels: reports.map((_, i) => String(i + 1)),
    datasets: [
      {
        label: 'Intentos incorrectos',
        data: reports.map((r) => r.incorrectas),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="inline-flex w-full">
      <div className="h-screen w-1/6 px-4 border-r bg-white">
        <div className="h-3/4 flex flex-col justify-around text-gray-500">
          <h3 className="pl-1 cursor-pointer text-sm flex items-center py-2 mb-2 hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in">
            <span className="mr-3">Discriminación Auditiva</span>
          </h3>
          <h3 className="pl-1 cursor-pointer text-sm flex items-center py-2 mb-2 hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in">
            <span className="mr-3">Conciencia Fonológica</span>
          </h3>
          <h3 className="pl-1 text-sm flex items-center py-2 mb-2 hover:bg-gray-100 hover:text-gray-700 transition duration-200 ease-in">
            <span className="mr-3">Identificación Visual</span>
          </h3>
        </div>
      </div>
      <div className="text-center ml-11">
        <div className="inline-flex space-x-16 justify-around mb-8">
          <LinkButton
            to="/main-page"
            label="atras"
            icon="back"
            color="bg-blue-500"
            fontSize="flex-1 text-3xl sm:text-4xl mt-6 p-4"
          />
          <AnimatedJumbotron features={jumbotronProps} />
        </div>
        <div className="justify-center">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}
