import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Pruebas de integración: recorren flujos reales de usuario y verifican que el estado,
// los eventos, las rutas y el DOM se actualizan en conjunto.
// Antes de cada una se limpia localStorage y se vuelve a la ruta "/".
beforeEach(() => {
  localStorage.clear()
  window.history.pushState({}, '', '/')
})

// Busca la tarjeta de un producto por su nombre y hace clic en "Agregar al carrito".
async function agregarDesdeTarjeta(user, nombre) {
  const tarjeta = screen.getByRole('heading', { name: nombre }).closest('article')
  await user.click(within(tarjeta).getByRole('button', { name: /agregar al carrito/i }))
}

describe('flujo de compra (App)', () => {
  it('agrega un producto al carrito y actualiza el contador y el total', async () => {
    const user = userEvent.setup()
    render(<App />)

    // 1. El contador del carrito parte en cero
    expect(screen.getByLabelText(/carrito: 0 artículos/i)).toBeInTheDocument()

    // 2. Agregar el mouse desde su tarjeta (está en el catálogo completo, la ruta "/")
    await agregarDesdeTarjeta(user, 'Mouse Inalámbrico')

    // 3. El contador sube a 1
    expect(screen.getByLabelText(/carrito: 1 artículos/i)).toBeInTheDocument()

    // 4. En la página del carrito aparece el ítem y el total
    await user.click(screen.getByLabelText(/carrito: 1 artículos/i))
    const carrito = screen.getByRole('region', { name: /carrito de compras/i })
    expect(within(carrito).getByText('Mouse Inalámbrico')).toBeInTheDocument()
    expect(within(carrito).getByText('x1')).toBeInTheDocument()
    const total = screen.getByText('Total:').closest('p')
    expect(within(total).getByText('$15.990')).toBeInTheDocument()
  })

  it('filtra el catálogo al elegir una categoría', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: 'Audio' }))

    expect(screen.getByRole('heading', { name: 'Audio' })).toBeInTheDocument()
    expect(screen.queryByText('Mouse Inalámbrico')).not.toBeInTheDocument()
    expect(screen.getByText('Audífonos Bluetooth')).toBeInTheDocument()
  })

  it('crea un producto desde el panel de administración y aparece en el catálogo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: /administración/i }))
    await user.type(screen.getByLabelText('Nombre'), 'Soporte para notebook')
    await user.type(screen.getByLabelText('Precio'), '9990')
    await user.click(screen.getByRole('button', { name: /agregar producto/i }))

    expect(screen.getByText('Soporte para notebook')).toBeInTheDocument()
  })
})
