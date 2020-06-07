import { GeometryStyle, GeometryType } from "./types"

export const convertStyle = (style: GeometryStyle, type: GeometryType): mapboxgl.AnyPaint => {
  switch (type) {
    case "Point":
    case "LineString":
    case "Polygon":
    case "MultiPolygon":
    default:
      console.log("TODO")
  }
  return {}
}
