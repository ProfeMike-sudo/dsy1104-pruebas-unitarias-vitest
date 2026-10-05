import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ShoppingCart } from './ShoppingCart'
import { CartProvider, useCart } from '../../../context/CartContext'

const mouse = { id: 1, nombre: 'Mouse Inalámbrico', precio: 15990 }

// Componente auxiliar: un botón que agrega un producto de prueba, para no depender
// de la interfaz del catálogo solo para llegar a probar el carrito.
function CarritoDePrueba() {
  const carrito = useCart()
  return (
    <>
      <button onClick={() => carrito.add(mouse)}>Agregar para la prueba</button>
      <ShoppingCart />
    </>
  )
}

describe('ShoppingCart', () => {
  it('muestra el mensaje de vacío cuando no hay productos', () => {
    render(
      <CartProvider>
        <ShoppingCart />
      </CartProvider>,
    )
    expect(screen.getByText('El carrito está vacío.')).toBeInTheDocument()
  })

  it('muestra el producto y el total cuando hay algo en el carrito', async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <CarritoDePrueba />
      </CartProvider>,
    )

    await user.click(screen.getByRole('button', { name: /agregar para la prueba/i }))

    expect(screen.getByText('Mouse Inalámbrico')).toBeInTheDocument()
    // "$15.990" aparece dos veces (el subtotal del ítem y el total): se usa getAllByText.
    expect(screen.getAllByText('$15.990')).toHaveLength(2)
  })
})
