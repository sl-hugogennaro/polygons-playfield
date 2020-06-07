import { Map, GeoJSONSource } from 'mapbox-gl'
import { v4 as uuid } from 'uuid'
import { Feature } from 'geojson'

import { wrapFC } from '../../helpers/utils'
import { GeometryData, GeometryStyle, IdModifiers } from './types'
import { GEOMETRY_ID, DEFAULT_STYLE, ID_MODIFIERS } from './constants'
import { geometryDataToGeoJSON } from './utils'
import { convertStyle } from './style'

// can take in : Features (GeoJSON), string (WKT) or raw data (number[]...)
export const addGeometry = (map: Map, data: GeometryData, style: GeometryStyle = DEFAULT_STYLE) => {
  const identifier = `${GEOMETRY_ID}-${uuid()}`
  const geo = geometryDataToGeoJSON(data)
  const identifier_mods = modifiersByGeometryType(geo)
  // Sourcing
  map.addSource(identifier, {
    type: 'geojson',
    data: wrapFC([geo]),
  })

  // Styling
  geo.properties = { ...geo.properties, paint_ids: [] }
  for (const id_mod of identifier_mods) {
    const id = `${identifier}-${id_mod}`
    geo.properties.paint_ids.push(id)

    map.addLayer({
      id,
      type: id_mod, // circle line or fill
      source: identifier,
      paint: convertStyle(style, id_mod),
    })
  }

  // Update geo to keep track of style ids
  ;(map.getSource(identifier) as GeoJSONSource).setData(wrapFC([geo]))
}

const modifiersByGeometryType = ({ geometry: { type } }: Feature): IdModifiers[] => {
  const [points, lines, polygons] = ID_MODIFIERS
  switch (type) {
    case 'Point':
    case 'MultiPoint':
      return [points]
    case 'LineString':
    case 'MultiLineString':
      return [lines]
    case 'Polygon':
    case 'MultiPolygon':
      return [lines, polygons]
    default:
      throw new Error(`Unknown geometry type: ${type}`)
  }
}
