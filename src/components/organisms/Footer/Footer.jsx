import { Container } from 'react-bootstrap'

// Organismo: pie de página. Es informativo: no recibe datos ni maneja estado,
// solo avisa a props.onNavegar cuando se hace clic en "Administración".
export function Footer(props) {
  return (
    <footer className="tienda-footer">
      <Container className="d-flex flex-wrap justify-content-between gap-2">
        <span>Tienda Demo · Proyecto de referencia DSY1104</span>
        <a
          href="/admin/productos"
          onClick={(e) => {
            e.preventDefault()
            props.onNavegar('/admin/productos')
          }}
        >
          Administración
        </a>
      </Container>
    </footer>
  )
}
