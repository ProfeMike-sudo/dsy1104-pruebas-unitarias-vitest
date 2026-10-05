import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('muestra el texto que recibe por props', () => {
    render(<Badge>Sin stock</Badge>)
    expect(screen.getByText('Sin stock')).toBeInTheDocument()
  })

  it('usa la clase de color por defecto si no se indica tone', () => {
    render(<Badge>Accesorios</Badge>)
    expect(screen.getByText('Accesorios')).toHaveClass('text-bg-secondary')
  })

  it('usa la clase de color según el tone recibido', () => {
    render(<Badge tone="success">8 disponibles</Badge>)
    expect(screen.getByText('8 disponibles')).toHaveClass('text-bg-success')
  })
})
