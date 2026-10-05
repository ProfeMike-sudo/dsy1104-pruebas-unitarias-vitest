import { Card } from 'react-bootstrap'
import { Button } from '../../atoms/Button/Button'
import { Badge } from '../../atoms/Badge/Badge'
import { Precio } from '../../atoms/Precio/Precio'

// Molécula: combina átomos (Button + Badge + Precio) dentro de una Card de Bootstrap.
// Recibe el producto por props.producto y delega el clic de "Agregar" en props.onAdd.
export function ProductCard(props) {
  const producto = props.producto
  const sinStock = producto.stock === 0

  return (
    <Card as="article" className="card-producto h-100">
      {producto.imagen && (
        <Card.Img variant="top" src={producto.imagen} alt="" className="card-producto__imagen" />
      )}
      <Card.Body className="d-flex flex-column">
        <div className="mb-2 d-flex gap-2 flex-wrap">
          <Badge tone="neutral">{producto.categoria}</Badge>
          {producto.precioAnterior && <Badge tone="marca">Oferta</Badge>}
        </div>
        <Card.Title as="h3" className="h6">{producto.nombre}</Card.Title>
        <Precio valor={producto.precio} anterior={producto.precioAnterior ?? null} />
        <p className="mb-3">
          {sinStock ? (
            <Badge tone="warning">Sin stock</Badge>
          ) : (
            <Badge tone="success">{producto.stock} disponibles</Badge>
          )}
        </p>
        <div className="mt-auto d-grid">
          <Button onClick={() => props.onAdd(producto)} disabled={sinStock}>
            Agregar al carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
