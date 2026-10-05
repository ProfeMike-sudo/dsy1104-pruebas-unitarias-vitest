// Cada validación recibe el valor escrito y devuelve un mensaje de error,
// o un texto vacío ('') si el valor está bien. Así el formulario solo tiene que
// mostrar el mensaje cuando exista.

// trim() quita los espacios del principio y del final: "   " queda como "" (vacío).
export function validarObligatorio(valor, mensaje = 'Este campo es obligatorio.') {
  return valor.trim() === '' ? mensaje : ''
}

export function validarEmail(valor) {
  if (valor.trim() === '') {
    return 'El correo es obligatorio.'
  }
  // split('@') corta el texto en cada arroba y entrega una lista con los pedazos:
  // "ana@correo.cl" queda como ["ana", "correo.cl"].
  const partes = valor.trim().split('@')
  // Es válido si hay exactamente un arroba (dos pedazos), algo antes del arroba y
  // un punto después de él (includes('.') pregunta si el texto contiene un punto).
  const valido = partes.length === 2 && partes[0] !== '' && partes[1].includes('.')
  return valido ? '' : 'Escribe un correo válido, por ejemplo nombre@correo.cl.'
}

export function validarClave(valor) {
  return valor.length < 6 ? 'La clave debe tener al menos 6 caracteres.' : ''
}

// Para precio y stock: el campo llega como texto, así que se convierte con Number.
// Number('abc') da NaN (no es un número), y Number.isNaN detecta ese caso.
export function validarNumero(valor, nombreCampo, minimo = 0) {
  if (valor.trim() === '') {
    return `${nombreCampo} es obligatorio.`
  }
  const numero = Number(valor)
  if (Number.isNaN(numero) || numero < minimo) {
    return `${nombreCampo} debe ser un número desde ${minimo}.`
  }
  return ''
}

// Para "repetir la clave": las dos cajas deben tener exactamente lo mismo.
export function validarConfirmacion(clave, confirmacion) {
  return clave === confirmacion ? '' : 'Las claves no coinciden.'
}
