import { Map } from "mapbox-gl"
import { v4 as uuid } from "uuid"

import { GeometryData, GeometryStyle } from "./types"
import { wrapFC } from "../../helpers/utils"
import { geometryDataToGeoJSON } from "./utils"

const GEOMETRY_ID = "geometry"
const DEFAULT_STYLE: GeometryStyle = {
  stroke: { color: "red", opacity: 1, weight: 3 },
  fill: { color: "red", opacity: 1 },
  custom: { radius: 10 }
}
const ID_MODIFIERS = ["", "-fill", "-line"]

// can take in : Features (GeoJSON), string (WKT) or raw data (number[]...)
export const addGeometry = (map: Map, data: GeometryData, style: GeometryStyle = DEFAULT_STYLE) => {
  const identifier = `${GEOMETRY_ID}-${uuid()}`
  const geo = geometryDataToGeoJSON(data)
  const identifier_mods = modifiersByGeometryType(geo)
  map.addSource(identifier, {
    type: "geojson",
    data: wrapFC([geo])
  })
}

const modifiersByGeometryType = (data: GeometryData)