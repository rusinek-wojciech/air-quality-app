import { useGetMeasurementsBySensorIdQuery } from '../store/api/giosApi'
import { IndexSensor } from './utils'
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
  },
}

interface Props {
  indexSensor: IndexSensor
}

export const Graph = ({ indexSensor }: Props) => {
  const { data: measurements } = useGetMeasurementsBySensorIdQuery({
    sensorId: indexSensor.id,
  })

  if (!measurements) {
    return null
  }

  const values = [...measurements.values].reverse()

  const data: ChartData<'line'> = {
    labels: values.map((v) => convertDateStr(v.date)),
    datasets: [
      {
        data: values.map((v) => v.value),
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  }

  return (
    <>
      {/* <h3 className='text-xl h-1/6'>{`${indexSensor.code} ${indexSensor.name}`}</h3> */}
      <div className='relative h-full w-full'>
        <Line width={300} height={150} options={options} data={data} />
      </div>
    </>
  )
}

const convertDateStr = (dateStr: string) => {
  const d = new Date(dateStr)
  const date = d.toLocaleDateString()
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return `${date} ${time}`
}
