import type { Combo } from './types'

export const combos: Combo[] = []

export function getComboById(id: string): Combo | undefined {
  return combos.find(c => c.id === id)
}
