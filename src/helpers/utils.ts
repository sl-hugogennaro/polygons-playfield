import { directions } from "./directions"
import { FeatureCollection, Feature, Geometry, GeometryCollection, Position } from "geojson"

export const generateHTML = (content: string | HTMLElement, className?: string): HTMLDivElement => {
  const div = document.createElement("div")
  div.innerHTML = content as string
  if (className) {
    div.classList.add(className)
  }
  return div
}

const mult = 10 ** 5
export const mergeCoords = (coords1: Position, coords2: Position): Position => [
  (coords1[0] * mult + coords2[0] * mult) / mult,
  (coords1[1] * mult + coords2[1] * mult) / mult
]
export const wrapFC = (data: any[]): FeatureCollection => ({
  type: "FeatureCollection",
  features: data
})

const isFeature = (data: Geometry | Feature): data is Feature => data.type === "Feature"

const isGeometryCollection = (data: Geometry): data is GeometryCollection & { id: string } =>
  data.type === "GeometryCollection"

export const wrapF = (data: Geometry | Feature): Feature => {
  if (isFeature(data) && !!data.id) {
    return data
  } else {
    const baseGeo = { type: data.type, bbox: data.bbox }
    const geometry = isGeometryCollection(data as any)
      ? {
          ...baseGeo,
          geometries: (data as GeometryCollection).geometries
        }
      : {
          ...baseGeo,
          coordinates: (data as any).coordinates
        }
    return {
      type: "Feature",
      geometry: geometry as Geometry,
      properties: {}
      // id: data.id
    }
  }
}

const moveToDirection = (move: number, direction: Position): Position => [direction[0] * move, direction[1] * move]

const nbDirections = directions.length
export const rngMove = (coords: Position, moveRatio: number): Position => {
  const direction = Math.floor(Math.random() * nbDirections)
  const move = Math.random() * moveRatio
  return mergeCoords(coords, moveToDirection(move, directions[direction]))
}
