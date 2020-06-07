import { CirclePaint, FillPaint, LinePaint } from 'mapbox-gl'

import { GeometryStyle, IdModifiers } from './types'
import { DEFAULT_STYLE } from './constants'

export const convertStyle = (style: GeometryStyle = DEFAULT_STYLE, type: IdModifiers): mapboxgl.AnyPaint => {
  const { stroke, fill, custom } = style
  switch (type) {
    case 'circle':
      return {
        'circle-radius': custom?.radius,
        'circle-color': fill?.color,
        'circle-opacity': fill?.opacity,
        'circle-stroke-width': stroke?.weight,
        'circle-stroke-color': stroke?.color,
        'circle-stroke-opacity': stroke?.opacity,
      } as CirclePaint
    case 'fill':
      return {
        'fill-color': fill?.color,
        'fill-opacity': fill?.opacity,
      } as FillPaint
    case 'line':
      return {
        'line-opacity': stroke?.opacity,
        'line-color': stroke?.color,
        'line-width': stroke?.weight,
      } as LinePaint
    default:
      throw new Error(`Unknown style type conversion: ${type}`)
  }
}
