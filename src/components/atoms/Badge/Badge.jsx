// Átomo: etiqueta pequeña para mostrar un estado o categoría.
// Cada "tone" se traduce a una clase de color de Bootstrap.
const CLASES = {
  neutral: 'text-bg-secondary',
  success: 'text-bg-success',
  warning: 'text-bg-warning',
  marca: 'text-bg-primary',
}

export function Badge(props) {
  const tone = props.tone ?? 'neutral'
  return <span className={`badge ${CLASES[tone]}`}>{props.children}</span>
}
