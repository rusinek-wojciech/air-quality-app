import { Station, Stations } from 'types'

const PI_180 = Math.PI / 180
const R = 6371

const toRad = (value: number): number => {
  return value * PI_180
}

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const sin2dLat = Math.sin(dLat / 2) * Math.sin(dLat / 2)
  const sin2dLon = Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const cos2lat = Math.cos(toRad(lat1)) * Math.cos(toRad(lat2))

  const a = sin2dLat + sin2dLon * cos2lat
  const angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * angle
  return distance
}

export const getClosestStation = (
  stations: Stations,
  position: GeolocationPosition
): [Station, number] => {
  let currentMinDistance = Infinity
  const station = stations.reduce((acc, curr) => {
    const distance = calculateDistance(
      Number(curr.gegrLat),
      Number(curr.gegrLon),
      position.coords.latitude,
      position.coords.longitude
    )
    if (distance < currentMinDistance) {
      currentMinDistance = distance
      return curr
    }
    return acc
  })

  return [station, currentMinDistance]
}

export const geolocationPromise: Promise<GeolocationPosition> = new Promise(
  (resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject)
  }
)
