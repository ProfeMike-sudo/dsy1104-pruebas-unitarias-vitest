import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormularioLogin } from './FormularioLogin'

describe('FormularioLogin', () => {
  it('muestra los errores y no envía si los campos están vacíos', async () => {
    const user = userEvent.setup()
    const onEnviar = vi.fn()
    render(<FormularioLogin onEnviar={onEnviar} />)

    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText(/al menos 6 caracteres/i)).toBeInTheDocument()
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('rechaza un correo mal escrito', async () => {
    const user = userEvent.setup()
    render(<FormularioLogin onEnviar={() => {}} />)

    await user.type(screen.getByLabelText('Correo'), 'sin-arroba')
    await user.type(screen.getByLabelText('Clave'), '123456')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(screen.getByText(/escribe un correo válido/i)).toBeInTheDocument()
  })

  it('envía el correo cuando los datos son válidos', async () => {
    const user = userEvent.setup()
    const onEnviar = vi.fn()
    render(<FormularioLogin onEnviar={onEnviar} />)

    await user.type(screen.getByLabelText('Correo'), 'ana@correo.cl')
    await user.type(screen.getByLabelText('Clave'), '123456')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(onEnviar).toHaveBeenCalledWith({ email: 'ana@correo.cl' })
  })
})
