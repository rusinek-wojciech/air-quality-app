import { Sensors, AirIndex } from '../types'

export const convert = (sensors: Sensors, airIndex: AirIndex) => {
  const data = sensors.map((sensor) => {
    switch (sensor.param.paramCode) {
      case 'NO2': {
        return {
          ...sensor,
          calcDate: airIndex.no2CalcDate,
          sourceDate: airIndex.no2SourceDataDate,
          levelName: airIndex.no2IndexLevel!.indexLevelName,
        }
      }
      case 'O3': {
        return {
          ...sensor,
          calcDate: airIndex.o3CalcDate,
          sourceDate: airIndex.o3SourceDataDate,
          levelName: airIndex.o3IndexLevel!.indexLevelName,
        }
      }
      case 'SO2': {
        return {
          ...sensor,
          calcDate: airIndex.so2CalcDate,
          sourceDate: airIndex.so2SourceDataDate,
          levelName: airIndex.so2IndexLevel!.indexLevelName,
        }
      }
      case 'PM2.5': {
        return {
          ...sensor,
          calcDate: airIndex.pm25CalcDate,
          sourceDate: airIndex.pm25SourceDataDate,
          levelName: airIndex.pm25IndexLevel!.indexLevelName,
        }
      }
      case 'PM10': {
        return {
          ...sensor,
          calcDate: airIndex.pm10CalcDate,
          sourceDate: airIndex.pm10SourceDataDate,
          levelName: airIndex.pm10IndexLevel!.indexLevelName,
        }
      }
      case 'C6H6': {
        return {
          //   ...sensor,
          //   calcDate: airIndex.cCalcDate,
          //   sourceDate: airIndex.no2SourceDataDate,
          //   levelName: airIndex.no2IndexLevel!.indexLevelName,
        }
      }
      case 'CO': {
        return {
          ...sensor,
          calcDate: airIndex.coCalcDate,
          sourceDate: airIndex.coSourceDataDate,
          levelName: airIndex.no2IndexLevel!.indexLevelName,
        }
      }
      default:
        throw new Error(
          `Unknown param ${sensor.param.paramCode}. Request for update.`
        )
    }
  })
}
