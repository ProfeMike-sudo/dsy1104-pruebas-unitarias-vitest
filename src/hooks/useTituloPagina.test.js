import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTituloPagina } from './useTituloPagina'

// Un hook no se dibuja: se prueba con renderHook, igual que el carrito.
describe('useTituloPagina', () => {
  it('cambia el título de la pestaña del navegador', () => {
    renderHook(() => useTituloPagina('Carrito'))

    expect(document.title).toBe('Carrito | Tienda Demo')
  })

  it('actualiza el título cuando recibe uno distinto', () => {
    const { rerender } = renderHook(({ titulo }) => useTituloPagina(titulo), {
      initialProps: { titulo: 'Inicio' },
    })
    expect(document.title).toBe('Inicio | Tienda Demo')

    rerender({ titulo: 'Ofertas' })

    expect(document.title).toBe('Ofertas | Tienda Demo')
  })
})
