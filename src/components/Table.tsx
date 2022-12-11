import { useGetStationsQuery } from '../store/api/giosApi'
import { Station } from '../types'
import { useState } from 'react'
import { StationDetails } from './StationDetails'
import { Modal } from './common/Modal'

export const Table = () => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const { data: stations } = useGetStationsQuery()

  const handleClick = (station: Station) => () => {
    setSelectedStation(station)
  }

  const handleClose = () => {
    setSelectedStation(null)
  }

  return (
    <div>
      <h1>Air Quality App</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Województwo</th>
              <th>Powiat</th>
              <th>Gmina</th>
              <th>Miasto</th>
              <th>Adres</th>
            </tr>
          </thead>
          <tbody>
            {!!stations
              ? stations.map((station) => (
                  <StationRow
                    key={station.id}
                    station={station}
                    onClick={handleClick(station)}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
      {!!selectedStation && (
        <Modal onClose={handleClose}>
          <StationDetails station={selectedStation} />
        </Modal>
      )}
    </div>
  )
}

const StationRow = ({
  station,
  onClick,
}: {
  station: Station
  onClick: () => void
}) => {
  const { provinceName, districtName, communeName } = station.city.commune
  const cityName = station.city.name

  const commune = cityName === communeName ? '-' : communeName
  const district = communeName === districtName ? '-' : districtName

  return (
    <tr className='cursor-pointer hover:bg-slate-300' onClick={onClick}>
      <td>{provinceName}</td>
      <td>{district}</td>
      <td>{commune}</td>
      <td>{cityName}</td>
      <td>{station.addressStreet}</td>
    </tr>
  )
}
