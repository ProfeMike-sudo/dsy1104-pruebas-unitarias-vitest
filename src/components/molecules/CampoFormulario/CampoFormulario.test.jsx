import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CampoFormulario } from './CampoFormulario'

describe('CampoFormulario', () => {
  it('muestra la etiqueta y el valor recibidos por props', () => {
    render(<CampoFormulario id="correo" etiqueta="Correo" valor="ana@correo.cl" onChange={() => {}} />)
    expect(screen.getByLabelText('Correo')).toHaveValue('ana@correo.cl')
  })

  it('avisa con el texto escrito cada vez que cambia', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<CampoFormulario id="nombre" etiqueta="Nombre" valor="" onChange={onChange} />)

    await user.type(screen.getByLabelText('Nombre'), 'A')

    expect(onChange).toHaveBeenCalledWith('A')
  })

  it('muestra el mensaje de error cuando llega por props', () => {
    render(<CampoFormulario id="correo" etiqueta="Correo" valor="" onChange={() => {}} error="El correo es obligatorio." />)
    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument()
  })
})
