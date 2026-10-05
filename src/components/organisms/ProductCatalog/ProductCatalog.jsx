import { Row, Col } from 'react-bootstrap'
import { ProductCard } from '../../molecules/ProductCard/ProductCard'

// Organismo: la grilla de productos. No sabe filtrar ni ordenar, solo recibe la
// lista ya lista en props.productos y delega el clic de "Agregar" en props.onAdd.
export function ProductCatalog(props) {
  if (props.productos.length === 0) {
    return <p role="status">No hay productos que coincidan con tu búsqueda.</p>
  }

  return (
    <Row className="g-4">
      {props.productos.map((producto) => (
        <Col key={producto.id} sm={6} lg={4}>
          <ProductCard producto={producto} onAdd={props.onAdd} />
        </Col>
      ))}
    </Row>
  )
}
