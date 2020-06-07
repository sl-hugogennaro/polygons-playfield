import { Feature, Position } from "geojson"
import { RawGeometry, GeometryData } from "./types"
import { depth } from "./utils"

export const isString = (geo: GeometryData): geo is string => typeof geo === "string"
export const isRawGeometry = (geo: GeometryData): geo is RawGeometry => !isString(geo) && Array.isArray(geo)
export const isFeature = <G extends GeoJSON.GeometryObject>(geo: GeometryData): geo is Feature<G> =>
  !isString(geo) && !isRawGeometry(geo) && typeof geo === "object" && geo.type === "Feature" && !!geo.geometry
export const isLastDepth = (geo: Position | Position[]): geo is Position => depth(geo) === 1
