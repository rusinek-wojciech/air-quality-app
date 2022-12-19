import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Measurements } from 'types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        autoSkip: true,
      },
    },
    x: {
      ticks: {
        autoSkip: true,
        maxRotation: 0,
        includeBounds: true,
      },
    },
  },
}

interface Props {
  measurements: Measurements
  title: string
}

export const Graph = ({ measurements, title }: Props) => {
  const { values } = measurements

  const data: ChartData<'line'> = {
    labels: values.map(({ date }) => new Date(date).toLocaleDateString()),
    datasets: [
      {
        data: values.map(({ value }) => value),
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  }

  return (
    <div className='relative h-full w-full'>
      <h2 className='pb-2'>{title}</h2>
      <Line width={300} height={200} options={options} data={data} />
    </div>
  )
}
