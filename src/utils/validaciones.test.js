import { describe, it, expect } from 'vitest'
import { validarObligatorio, validarEmail, validarClave, validarNumero, validarConfirmacion } from './validaciones'

describe('validarObligatorio', () => {
  it('devuelve un mensaje si el valor está vacío', () => {
    expect(validarObligatorio('')).toBe('Este campo es obligatorio.')
  })
  it('devuelve el mensaje propio si se indica uno', () => {
    expect(validarObligatorio('   ', 'Escribe tu nombre.')).toBe('Escribe tu nombre.')
  })
  it('devuelve vacío si el valor está escrito', () => {
    expect(validarObligatorio('Ana')).toBe('')
  })
})

describe('validarEmail', () => {
  it('rechaza un correo vacío', () => {
    expect(validarEmail('')).not.toBe('')
  })
  it('rechaza un correo sin arroba', () => {
    expect(validarEmail('sin-arroba')).not.toBe('')
  })
  it('acepta un correo válido', () => {
    expect(validarEmail('ana@correo.cl')).toBe('')
  })
})

describe('validarClave', () => {
  it('rechaza una clave de menos de 6 caracteres', () => {
    expect(validarClave('123')).not.toBe('')
  })
  it('acepta una clave de 6 caracteres o más', () => {
    expect(validarClave('123456')).toBe('')
  })
})

describe('validarNumero', () => {
  it('rechaza un valor vacío', () => {
    expect(validarNumero('', 'El precio')).not.toBe('')
  })
  it('rechaza un valor que no es número', () => {
    expect(validarNumero('abc', 'El precio')).not.toBe('')
  })
  it('rechaza un valor bajo el mínimo', () => {
    expect(validarNumero('0', 'El precio', 1)).not.toBe('')
  })
  it('acepta un número válido', () => {
    expect(validarNumero('12000', 'El precio', 1)).toBe('')
  })
})

describe('validarConfirmacion', () => {
  it('rechaza si las claves no coinciden', () => {
    expect(validarConfirmacion('123456', '654321')).not.toBe('')
  })
  it('acepta si las claves coinciden', () => {
    expect(validarConfirmacion('123456', '123456')).toBe('')
  })
})
