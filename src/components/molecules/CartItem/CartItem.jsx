import { Button } from '../../atoms/Button/Button'
import { formatoPrecio } from '../../../utils/formatoPrecio'

// Molécula: una línea del carrito. Muestra nombre, cantidad, subtotal y botón quitar.
export function CartItem(props) {
  const item = props.item
  const subtotal = item.producto.precio * item.cantidad

  return (
    <li className="list-group-item d-flex flex-wrap align-items-center gap-3">
      <div className="flex-grow-1">
        <span className="fw-semibold">{item.producto.nombre}</span>{' '}
        <span className="text-muted">x{item.cantidad}</span>
      </div>
      <span className="fw-bold">{formatoPrecio(subtotal)}</span>
      <div className="d-flex gap-2">
        <Button variant="outline-secondary" onClick={() => props.onIncrement(item.producto.id)}>
          +
        </Button>
        <Button variant="danger" onClick={() => props.onRemove(item.producto.id)}>
          Quitar
        </Button>
      </div>
    </li>
  )
}
