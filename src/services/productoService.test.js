import { describe, it, expect, beforeEach } from 'vitest'
import { listarProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } from './productoService'

// localStorage.clear() antes de cada prueba: así ninguna depende de lo que dejó la anterior.
beforeEach(() => {
  localStorage.clear()
})

describe('productoService', () => {
  it('listarProductos carga los datos iniciales la primera vez', () => {
    expect(listarProductos().length).toBeGreaterThan(0)
  })

  it('crearProducto agrega un producto con un id nuevo', () => {
    const antes = listarProductos().length
    const nuevo = crearProducto({ nombre: 'Soporte para notebook', precio: 9990 })
    expect(listarProductos()).toHaveLength(antes + 1)
    expect(obtenerProducto(nuevo.id).nombre).toBe('Soporte para notebook')
  })

  it('actualizarProducto cambia solo los campos indicados', () => {
    const nuevo = crearProducto({ nombre: 'Mousepad chico', precio: 2990 })
    actualizarProducto(nuevo.id, { precio: 3990 })
    const actualizado = obtenerProducto(nuevo.id)
    expect(actualizado.nombre).toBe('Mousepad chico')
    expect(actualizado.precio).toBe(3990)
  })

  it('eliminarProducto lo quita de la lista', () => {
    const nuevo = crearProducto({ nombre: 'Producto de prueba', precio: 1000 })
    eliminarProducto(nuevo.id)
    expect(obtenerProducto(nuevo.id)).toBeNull()
  })

  it('obtenerProducto devuelve null si el id no existe', () => {
    expect(obtenerProducto(999999)).toBeNull()
  })
})
