import mapboxgl, { Map } from "mapbox-gl"
import { mapAccessToken, mapStyleId } from "./data"

export const makeMap = (id: string | HTMLElement, center: [number, number], zoom: number): Promise<Map> => {
  mapboxgl.accessToken = mapAccessToken
  const map = new Map({
    container: id,
    center,
    zoom,
    style: `mapbox://styles/${mapStyleId}`
  })
  return new Promise((resolve) => {
    map.on("load", () => resolve(map))
  })
}
