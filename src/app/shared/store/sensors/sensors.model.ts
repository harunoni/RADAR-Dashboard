import { Key, Label } from '../config/config.model'

export interface Sensor {
  id?: string
  source?: string
  keys?: Key[]
  type?: string
  visible?: boolean
  unit: string
  label: Label
}
