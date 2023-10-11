import { GraphView } from './modules/graph-view/GraphView'
import { LocationView } from './modules/location-view/LocationView'
import { SensorView } from './modules/sensor-view/SensorView'

export function App() {
  return (
    <div className='flex flex-wrap min-h-screen max-w-7xl mx-auto shadow-2xl'>
      <div className='flex-1 p-4 min-w-80 bg-slate-300 shadow-2xl'>
        <LocationView />
      </div>
      <div className='flex-1 p-4 min-w-80 bg-slate-200 shadow-2xl'>
        <SensorView />
      </div>
      <div className='flex-1 p-4 min-w-80 bg-slate-100 shadow-2xl'>
        <GraphView />
      </div>
    </div>
  )
}
