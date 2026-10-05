import { describe, it, expect } from 'vitest'
import { filtrarProductos } from './filtrarProductos'

const productos = [
  { id: 1, nombre: 'Mouse Inalámbrico', categoria: 'Accesorios' },
  { id: 2, nombre: 'Teclado Mecánico', categoria: 'Accesorios' },
  { id: 3, nombre: 'Audífonos Bluetooth', categoria: 'Audio' },
]

describe('filtrarProductos', () => {
  it('devuelve todos los productos si no hay filtros', () => {
    expect(filtrarProductos(productos)).toHaveLength(3)
  })

  it('filtra por texto, sin distinguir mayúsculas', () => {
    const resultado = filtrarProductos(productos, { texto: 'mouse' })
    expect(resultado).toHaveLength(1)
    expect(resultado[0].nombre).toBe('Mouse Inalámbrico')
  })

  it('filtra por categoría', () => {
    const resultado = filtrarProductos(productos, { categoria: 'Accesorios' })
    expect(resultado).toHaveLength(2)
  })

  it('combina texto y categoría', () => {
    const resultado = filtrarProductos(productos, { texto: 'teclado', categoria: 'Accesorios' })
    expect(resultado).toHaveLength(1)
  })
})
