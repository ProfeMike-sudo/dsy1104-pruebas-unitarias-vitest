// Función pura de utilidad: ideal para una primera prueba unitaria.
// Recibe un número y lo devuelve formateado como pesos chilenos (CLP).
export function formatoPrecio(precio) {
  if (typeof precio !== 'number' || Number.isNaN(precio)) {
    throw new TypeError('formatoPrecio espera un número')
  }
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(precio)
}
