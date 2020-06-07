import { GeoJsonGeometryTypes } from 'geojson'
import { GeometryStyle } from './types'

export const POSSIBLE_TYPES: GeoJsonGeometryTypes[] = [
  'Point',
  'LineString', // or MultiPoint
  'Polygon', // or LineString
  'MultiPolygon',
]
export const GEOMETRY_ID = 'geometry'
export const DEFAULT_STYLE: GeometryStyle = {
  stroke: { color: 'black', opacity: 1, weight: 2 },
  fill: { color: 'green', opacity: 0.5 },
  custom: { radius: 20 },
}
export const ID_MODIFIERS = ['circle', 'line', 'fill'] as const
