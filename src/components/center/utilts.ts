import { Sensors, AirIndex, Station, AirSensors } from '../../types'

export const convertToAirSensors = (
  sensors: Sensors,
  airIndex: AirIndex
): AirSensors => {
  return sensors.map((sensor) => {
    const { id, param } = sensor
    const { paramCode, paramName } = param
    const { no2, o3, pm10, pm25, so2 } = airIndex

    const body = {
      id,
      code: paramCode,
      name: paramName,
    }

    if (no2 && paramCode === 'NO2') {
      return {
        ...body,
        status: no2.indexLevelName,
        date: no2.sourceDate,
      }
    }
    if (o3 && paramCode === 'O3') {
      return {
        ...body,
        status: o3.indexLevelName,
        date: o3.sourceDate,
      }
    }
    if (pm10 && paramCode === 'PM10') {
      return {
        ...body,
        status: pm10.indexLevelName,
        date: pm10.sourceDate,
      }
    }

    if (pm25 && paramCode === 'PM2.5') {
      return {
        ...body,
        status: pm25.indexLevelName,
        date: pm25.sourceDate,
      }
    }
    if (so2 && paramCode === 'SO2') {
      return {
        ...body,
        status: so2.indexLevelName,
        date: so2.sourceDate,
      }
    }

    // sensor without known index
    return {
      ...body,
      status: 'Brak indeksu',
      date: null,
    }
  })
}

export const getStationDetails = (station: Station) => {
  const { provinceName, districtName, communeName } = station.city.commune
  const cityName = station.city.name
  return {
    provinceName,
    commune: cityName === communeName ? '-' : communeName,
    district: communeName === districtName ? '-' : districtName,
    cityName,
    street: station.addressStreet ?? '-',
  }
}
