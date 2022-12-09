import { memo } from 'react'
import { AirIndex } from '../types'

interface Props {
  airIndex: AirIndex
}

export const AirIndexDetails = ({ airIndex }: Props) => {
  const {
    stIndexLevel,
    stIndexStatus,
    stIndexCrParam,
    stCalcDate,
    stSourceDataDate,
    so2IndexLevel,
    so2CalcDate,
    so2SourceDataDate,
    no2IndexLevel,
    no2CalcDate,
    no2SourceDataDate,
    o3IndexLevel,
    o3CalcDate,
    o3SourceDataDate,
    pm10IndexLevel,
    pm10CalcDate,
    pm10SourceDataDate,
    pm25IndexLevel,
    pm25CalcDate,
    pm25SourceDataDate,
  } = airIndex

  return (
    <div>
      <h2>Air index</h2>

      <div>
        <h3>ST</h3>
        {!!stIndexLevel ? (
          <div>
            <p>{stIndexLevel.indexLevelName}</p>
            <p>{stIndexStatus}</p>
            <p>{stIndexCrParam}</p>
            <p>
              {stCalcDate} {stSourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>

      <div>
        <h3>SO2</h3>
        {!!so2IndexLevel ? (
          <div>
            <p>{so2IndexLevel.indexLevelName}</p>
            <p>
              {so2CalcDate} {so2SourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>

      <div>
        <h3>NO2</h3>
        {!!no2IndexLevel ? (
          <div>
            <p>{no2IndexLevel.indexLevelName}</p>
            <p>
              {no2CalcDate} {no2SourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>

      <div>
        <h3>O3</h3>
        {!!o3IndexLevel ? (
          <div>
            <p>{o3IndexLevel.indexLevelName}</p>
            <p>
              {o3CalcDate} {o3SourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>

      <div>
        <h3>PM10</h3>
        {!!pm10IndexLevel ? (
          <div>
            <p>{pm10IndexLevel.indexLevelName}</p>
            <p>
              {pm10CalcDate} {pm10SourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>

      <div>
        <h3>PM25</h3>
        {!!pm25IndexLevel ? (
          <div>
            <p>{pm25IndexLevel.indexLevelName}</p>
            <p>
              {pm25CalcDate} {pm25SourceDataDate}
            </p>
          </div>
        ) : (
          <div>-</div>
        )}
      </div>
    </div>
  )
}

export const AirIndexDetailsMemo = memo(
  AirIndexDetails,
  (prev, next) => prev.airIndex.id === next.airIndex.id
)
