import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'

const mouse = { id: 1, nombre: 'Mouse Inalámbrico', precio: 15990 }
const teclado = { id: 2, nombre: 'Teclado Mecánico', precio: 10000 }

// wrapper: envuelve el hook con el Provider, igual que lo hace App.jsx de verdad.
function wrapper(props) {
  return <CartProvider>{props.children}</CartProvider>
}

describe('CartContext', () => {
  it('agrega productos y calcula cantidad y total correctamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.add(mouse)
      result.current.add(mouse)
      result.current.add(teclado)
    })

    expect(result.current.totalItems).toBe(3)
    expect(result.current.totalPrecio).toBe(41980)
  })

  it('remove quita el producto del carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.add(mouse)
      result.current.remove(mouse.id)
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('increment suma una unidad más al producto', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.add(mouse)
      result.current.increment(mouse.id)
    })

    expect(result.current.totalItems).toBe(2)
  })

  it('useCart lanza un error si se usa fuera de un CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow(/CartProvider/)
  })
})
