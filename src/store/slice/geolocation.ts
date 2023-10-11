import { Stations } from 'types'

const PI_180 = Math.PI / 180
const R = 6371

function degreeToRad(value: number): number {
  return value * PI_180
}

function calculateDistanceBetween(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = degreeToRad(lat2 - lat1)
  const dLon = degreeToRad(lon2 - lon1)

  const sindLat = Math.sin(dLat / 2)
  const sindLon = Math.sin(dLon / 2)
  const cos2lat = Math.cos(degreeToRad(lat1)) * Math.cos(degreeToRad(lat2))

  const a = sindLat * sindLat + sindLon * sindLon * cos2lat
  const angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * angle
  return distance
}

export function getClosestStation(
  stations: Stations,
  position: GeolocationPosition
) {
  let distance = Infinity

  const station = stations.reduce((acc, curr) => {
    const currentDistance = calculateDistanceBetween(
      Number(curr.gegrLat),
      Number(curr.gegrLon),
      position.coords.latitude,
      position.coords.longitude
    )
    if (currentDistance < distance) {
      distance = currentDistance
      return curr
    }
    return acc
  })

  return {
    station,
    distance,
  } as const
}

export const geolocationPromise = new Promise<GeolocationPosition>(
  (resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject)
  }
)
