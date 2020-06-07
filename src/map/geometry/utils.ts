import { parse } from "terraformer-wkt-parser"

import { RawGeometry, GeometryData } from "./types"
import { GeoJsonGeometryTypes, GeometryObject, Position, Feature } from "geojson"
import { isLastDepth, isString, isRawGeometry, isFeature } from "./guards"
import { wrapF } from "../../helpers/utils"

export const wktToGeoJSON: (wkt: string) => GeometryObject = (wkt) => parse(wkt)

const invertCoords = (geo: Position | Position[]): Position | Position[] => {
  if (isLastDepth(geo)) {
    return geo.reduce((acc: number[], pos: number) => [pos, ...acc], [])
  } else {
    return geo.map((subGeo) => invertCoords(subGeo) as Position)
  }
}
export const depth = (geo: number | number[] | number[][] | number[][][] | number[][][][]): number =>
  Array.isArray(geo) ? depth(geo[0]) + 1 : 0

const possibleTypes: GeoJsonGeometryTypes[] = [
  "Point",
  "LineString", // or MultiPoint
  "Polygon", // or LineString
  "MultiPolygon"
]
const depthToType: (depth: number) => GeoJsonGeometryTypes = (depth) => possibleTypes[depth - 1]
// ret GeometryObject
export const rawDataToGeoJSON: (data: RawGeometry) => GeometryObject = (data) =>
  ({
    type: depthToType(depth(data)),
    coordinates: invertCoords(data as (Position | Position[]))
  } as GeometryObject)

export const geometryDataToGeoJSON = (data: GeometryData): Feature => {
  let geo = null
  if (isString(data)) {
    geo = wktToGeoJSON(data)
  } else if (isRawGeometry(data)) {
    geo = rawDataToGeoJSON(data)
  } else if (isFeature(data)) {
    // geojson
    geo = data
  } else {
    // invalid
    throw new Error(`Attempt to initiate geometry with unusable data: ${data}`)
  }
  return wrapF(geo)
}
