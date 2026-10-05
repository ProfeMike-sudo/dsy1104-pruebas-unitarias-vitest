import { useState } from 'react'
import { Container, Form, Nav, Navbar as BarraBootstrap } from 'react-bootstrap'
import { Badge } from '../../atoms/Badge/Badge'

// Organismo: cabecera de la tienda. No conoce el router: cuando alguien navega o
// busca, avisa con props.onNavegar(ruta) y props.onBuscar(texto), y la plantilla
// que lo usa decide qué hacer con eso.
export function Navbar(props) {
  const [texto, setTexto] = useState('')
  const categorias = props.categorias ?? []

  // Los enlaces son <a> reales (se ven y se comportan como enlaces), pero en vez de
  // recargar la página avisamos a props.onNavegar. preventDefault() cancela la recarga.
  function ir(evento, ruta) {
    evento.preventDefault()
    props.onNavegar(ruta)
  }

  function buscar(evento) {
    evento.preventDefault()
    if (texto.trim() !== '') {
      props.onBuscar(texto.trim())
    }
  }

  return (
    <header>
      <BarraBootstrap expand="lg" className="tienda-topbar">
        <Container>
          <BarraBootstrap.Brand href="/" onClick={(e) => ir(e, '/')} className="me-lg-4">
            <h1 className="tienda-logo h4 m-0">
              Tienda <span>Demo</span>
            </h1>
          </BarraBootstrap.Brand>

          <a
            href="/carrito"
            onClick={(e) => ir(e, '/carrito')}
            className="btn btn-outline-secondary ms-auto me-2 order-lg-last ms-lg-3"
            aria-label={`Carrito: ${props.totalItems} artículos`}
          >
            Carrito <Badge tone="marca">{props.totalItems}</Badge>
          </a>
          <BarraBootstrap.Toggle aria-controls="menu-principal" />

          <BarraBootstrap.Collapse id="menu-principal">
            <Form className="buscador flex-grow-1 my-3 my-lg-0 mx-lg-3" role="search" onSubmit={buscar}>
              <Form.Control
                type="search"
                placeholder="¿Qué estás buscando?"
                aria-label="Buscar productos"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Buscar</button>
            </Form>
            <Nav>
              <Nav.Link href="/login" onClick={(e) => ir(e, '/login')}>Ingresar</Nav.Link>
            </Nav>
          </BarraBootstrap.Collapse>
        </Container>
      </BarraBootstrap>

      <nav className="tienda-categorias" aria-label="Categorías">
        <Container>
          <ul className="nav flex-nowrap">
            <li><a className="nav-link" href="/catalogo" onClick={(e) => ir(e, '/catalogo')}>Catálogo</a></li>
            {categorias.map((c) => (
              <li key={c}>
                <a className="nav-link" href={`/categoria/${c}`} onClick={(e) => ir(e, `/categoria/${c}`)}>
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  )
}
