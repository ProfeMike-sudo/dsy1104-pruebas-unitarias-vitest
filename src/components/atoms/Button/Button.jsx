// Átomo: el bloque más pequeño y reutilizable de la interfaz.
// Recibe sus datos por "props", igual que cualquier componente. Como no todas las
// props son obligatorias, las que tienen un valor típico usan "??" para completar
// el que falte: props.variant ?? 'primary' se lee "variant, o 'primary' si no llegó".
export function Button(props) {
  const variant = props.variant ?? 'primary'
  const type = props.type ?? 'button'
  const disabled = props.disabled ?? false

  return (
    <button type={type} className={`btn btn-${variant}`} onClick={props.onClick} disabled={disabled}>
      {props.children}
    </button>
  )
}
