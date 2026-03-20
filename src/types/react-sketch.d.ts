declare module 'react-sketch' {
  import type { ComponentType } from 'react'
  export const SketchField: ComponentType<{
    width?: string
    height?: string
    tool?: unknown
    lineColor?: string
    lineWidth?: number
    className?: string
  }>
  export const Tools: { Pencil: unknown }
}
