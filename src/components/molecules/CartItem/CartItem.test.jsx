import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartItem } from './CartItem'

const item = { producto: { id: 1, nombre: 'Mouse Inalámbrico', precio: 15990 }, cantidad: 2 }

describe('CartItem', () => {
  it('muestra el nombre, la cantidad y el subtotal', () => {
    render(<CartItem item={item} onRemove={() => {}} onIncrement={() => {}} />)
    expect(screen.getByText('Mouse Inalámbrico')).toBeInTheDocument()
    expect(screen.getByText('x2')).toBeInTheDocument()
    expect(screen.getByText('$31.980')).toBeInTheDocument()
  })

  it('llama a onIncrement con el id del producto', async () => {
    const user = userEvent.setup()
    const onIncrement = vi.fn()
    render(<CartItem item={item} onRemove={() => {}} onIncrement={onIncrement} />)

    await user.click(screen.getByRole('button', { name: '+' }))

    expect(onIncrement).toHaveBeenCalledWith(1)
  })

  it('llama a onRemove con el id del producto', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<CartItem item={item} onRemove={onRemove} onIncrement={() => {}} />)

    await user.click(screen.getByRole('button', { name: /quitar/i }))

    expect(onRemove).toHaveBeenCalledWith(1)
  })
})
