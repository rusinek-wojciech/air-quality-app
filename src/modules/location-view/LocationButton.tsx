import { useEffect } from 'react'
import { MdLocationPin } from 'react-icons/md'
import { Station, Stations } from 'types'
import { IconCircle } from 'common/IconCircle'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setGeolocation } from 'store/slice/stationSlice'

interface Props {
  stations: Stations
  onClick: (station: Station) => void
}

export function LocationButton({ stations, onClick }: Props) {
  const geolocation = useAppSelector((state) => state.station.geolocation)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setGeolocation(stations))
  }, [stations])

  const handleClick = () => {
    onClick(geolocation!.station)
  }

  const details = geolocation
    ? `${geolocation.station.stationName}, ${geolocation.distance.toFixed(
        2
      )} km`
    : 'Brakuje zgody na użycie lokalizacji'

  return (
    <button
      onClick={handleClick}
      disabled={!geolocation}
      className='flex gap-4 bg-slate-500 rounded-lg p-2 cursor-pointer -ml-2 drop-shadow-md'
    >
      <IconCircle className='bg-slate-600'>
        <MdLocationPin />
      </IconCircle>
      <div className='flex-1 text-slate-200 text-left'>
        <p>Użyj najbliższej lokalizacji </p>
        <p className='text-xs'>{details}</p>
      </div>
    </button>
  )
}
