export interface User {
  id: string
  username: string
}

export interface Child {
  id: string
  nombre: string
  apellido: string
  edad?: number
}

export interface ActivityPayload {
  nombre: string
  correctas: number
  incorrectas: number
  usuario: string
}

export interface ReportItem {
  incorrectas: number
  [key: string]: unknown
}
