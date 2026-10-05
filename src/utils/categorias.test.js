import { describe, it, expect } from 'vitest'
import { categoriasDe } from './categorias'

describe('categoriasDe', () => {
  it('devuelve cada categoría una sola vez', () => {
    const productos = [
      { categoria: 'Audio' },
      { categoria: 'Accesorios' },
      { categoria: 'Audio' },
    ]
    expect(categoriasDe(productos)).toEqual(['Audio', 'Accesorios'])
  })

  it('devuelve una lista vacía si no hay productos', () => {
    expect(categoriasDe([])).toEqual([])
  })
})
