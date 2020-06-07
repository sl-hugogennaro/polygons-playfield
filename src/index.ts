import 'mapbox-gl/dist/mapbox-gl.css'
import './style.css'
import { center, zoom, geojsonlinestring, wktpolygonWHole } from './modules/map/data'
import { makeMap } from './modules/map'
import { addGeometry } from './modules/geometry'

makeMap('app', center, zoom).then((map) => {
  // raw point
  addGeometry(map, [center[1], center[0]] as number[])
  // geojson linestring
  addGeometry(map, geojsonlinestring)
  // wkt polygon
  addGeometry(map, wktpolygonWHole)
})
