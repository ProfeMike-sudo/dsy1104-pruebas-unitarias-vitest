import { describe, it, expect } from 'vitest'
import { formatoPrecio } from './formatoPrecio'

// Prueba de una función pura: no necesita DOM, es la forma más simple de test.
describe('formatoPrecio', () => {
  it('formatea un número como pesos chilenos', () => {
    expect(formatoPrecio(15990)).toBe('$15.990')
  })

  it('formatea miles correctamente', () => {
    expect(formatoPrecio(119990)).toBe('$119.990')
  })

  it('lanza un error si no recibe un número', () => {
    expect(() => formatoPrecio('mil')).toThrow(TypeError)
  })
})
