import "mapbox-gl/dist/mapbox-gl.css"
import "./style.css"
import { center, zoom, linestring, polygon, multipolygon, polygonWHole } from "./map/data"
import { makeMap } from "./map/map"
import { addGeometry } from "./map/geometry"

//? TODO :
//? 1. add wkt/geojson/number[][][] with 1 function ✓
//? 2. get center polygon/multipolygon/shape?
//? 3. calc bounds from shape

//! WIP 1.
//! add related layers

makeMap("app", center, zoom).then((map) => {
  addGeometry(map, center as any)
  addGeometry(map, linestring)
  addGeometry(map, polygon)
  addGeometry(map, polygonWHole)
  addGeometry(map, multipolygon)
})
