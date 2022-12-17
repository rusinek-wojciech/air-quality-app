import { AirIndexRaw, AirIndex } from 'types'

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const convertAirIndex = (raw: AirIndexRaw): AirIndex => {
  let result: AirIndex = {
    id: raw.id,
  }

  if (raw.stIndexStatus) {
    result.st = {
      calcDate: raw.stCalcDate,
      sourceDate: raw.stSourceDataDate,
      indexLevelName: raw.stIndexLevel.indexLevelName,
      indexCrParam: raw.stIndexCrParam,
    }
  }

  if (raw.no2IndexLevel) {
    result.no2 = {
      calcDate: raw.no2CalcDate!,
      sourceDate: raw.no2SourceDataDate!,
      indexLevelName: raw.no2IndexLevel.indexLevelName,
    }
  }

  if (raw.o3IndexLevel) {
    result.o3 = {
      calcDate: raw.o3CalcDate!,
      sourceDate: raw.o3SourceDataDate!,
      indexLevelName: raw.o3IndexLevel.indexLevelName,
    }
  }

  if (raw.pm10IndexLevel) {
    result.pm10 = {
      calcDate: raw.pm10CalcDate!,
      sourceDate: raw.pm10SourceDataDate!,
      indexLevelName: raw.pm10IndexLevel.indexLevelName,
    }
  }

  if (raw.pm25IndexLevel) {
    result.pm25 = {
      calcDate: raw.pm25CalcDate!,
      sourceDate: raw.pm25SourceDataDate!,
      indexLevelName: raw.pm25IndexLevel.indexLevelName,
    }
  }

  if (raw.so2IndexLevel) {
    result.so2 = {
      calcDate: raw.so2CalcDate!,
      sourceDate: raw.so2SourceDataDate!,
      indexLevelName: raw.so2IndexLevel.indexLevelName,
    }
  }

  return result
}
