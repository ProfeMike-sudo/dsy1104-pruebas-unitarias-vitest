import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard } from './ProductCard'

const producto = {
  id: 1,
  nombre: 'Mouse Inalámbrico',
  precio: 15990,
  categoria: 'Accesorios',
  stock: 12,
  precioAnterior: 19990,
}

describe('ProductCard', () => {
  it('muestra el nombre y el precio del producto', () => {
    render(<ProductCard producto={producto} onAdd={() => {}} />)
    expect(screen.getByText('Mouse Inalámbrico')).toBeInTheDocument()
    expect(screen.getByText('$15.990')).toBeInTheDocument()
  })

  it('llama a onAdd con el producto al hacer clic en agregar', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ProductCard producto={producto} onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: /agregar al carrito/i }))

    expect(onAdd).toHaveBeenCalledWith(producto)
  })

  it('deshabilita el botón y muestra "Sin stock" cuando no hay stock', () => {
    render(<ProductCard producto={{ ...producto, stock: 0 }} onAdd={() => {}} />)
    expect(screen.getByText('Sin stock')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /agregar al carrito/i })).toBeDisabled()
  })
})
