import { Feature, Position } from 'geojson'
import { ID_MODIFIERS } from './constants'

export type LineString = Position[] // also MultiPoint
export type Polygon = LineString[] // also MultiLineString
export type RawGeometry = Position | LineString | Polygon | Polygon[] // MultiPolygons

export type GeometryData = string | RawGeometry | Feature
export type GeometryType = GeoJSON.GeoJsonTypes
export type GeometryStyle = {
  stroke?: {
    color?: string
    opacity?: number
    weight?: number
  }
  fill?: {
    color?: string
    opacity?: number
  }
  custom?: {
    radius?: number
  }
}

export type IdModifiers = typeof ID_MODIFIERS[number]
