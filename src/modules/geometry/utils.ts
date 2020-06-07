import { GeoJsonGeometryTypes, GeometryObject, Position, Feature } from 'geojson'
import { parse } from 'terraformer-wkt-parser'

import { wrapF } from '../../helpers/utils'
import { RawGeometry, GeometryData } from './types'
import { POSSIBLE_TYPES } from './constants'
import { isLastDepth, isString, isRawGeometry, isFeature } from './guards'

export const wktToGeoJSON: (wkt: string) => GeometryObject = (wkt) => parse(wkt)

const invertCoords = (geo: Position | Position[]): Position | Position[] => {
  if (isLastDepth(geo)) {
    return geo.reduce((acc: number[], pos: number) => [pos, ...acc], [])
  } else {
    return geo.map((subGeo) => invertCoords(subGeo) as Position)
  }
}
export const depth = (geo: number | number[] | number[][] | number[][][] | number[][][][]): number => (Array.isArray(geo) ? depth(geo[0]) + 1 : 0)

const depthToType: (depth: number) => GeoJsonGeometryTypes = (depth) => POSSIBLE_TYPES[depth - 1]
// ret GeometryObject
export const rawDataToGeoJSON: (data: RawGeometry) => GeometryObject = (data) =>
  ({
    type: depthToType(depth(data)),
    coordinates: invertCoords(data as Position | Position[]),
  } as GeometryObject)

export const geometryDataToGeoJSON = (data: GeometryData): Feature => {
  let geo = null
  if (isString(data)) {
    geo = wktToGeoJSON(data)
  } else if (isRawGeometry(data)) {
    geo = rawDataToGeoJSON(data)
  } else if (isFeature(data)) {
    geo = data
  } else {
    throw new Error(`Attempt to initiate geometry with unusable data: ${data}`)
  }
  return wrapF(geo)
}
