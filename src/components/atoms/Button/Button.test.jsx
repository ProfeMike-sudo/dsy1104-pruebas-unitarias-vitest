import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza el texto que recibe por props', () => {
    render(<Button>Agregar</Button>)
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument()
  })

  it('ejecuta onClick una vez cuando se hace clic', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Agregar</Button>)
    await user.click(screen.getByRole('button', { name: /agregar/i }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('no ejecuta onClick cuando está deshabilitado', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button onClick={onClick} disabled>
        Agregar
      </Button>,
    )

    const boton = screen.getByRole('button', { name: /agregar/i })
    expect(boton).toBeDisabled()

    await user.click(boton)
    expect(onClick).not.toHaveBeenCalled()
  })
})
