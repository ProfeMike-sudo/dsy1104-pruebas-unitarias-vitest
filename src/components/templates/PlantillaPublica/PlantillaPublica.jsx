import { Container } from 'react-bootstrap'
// useNavigate es un hook de react-router-dom (la librería de la guía 12).
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'
import { useProductos } from '../../../context/ProductosContext'
import { categoriasDe } from '../../../utils/categorias'
import { Navbar } from '../../organisms/Navbar/Navbar'
import { Footer } from '../../organisms/Footer/Footer'

// Plantilla: el esqueleto de toda página pública (cabecera, contenido y pie).
// No decide qué contenido se muestra: lo recibe en props.children, la prop especial
// que React llena con todo lo que quede escrito entre <PlantillaPublica> y
// </PlantillaPublica> en una página. Es una prop más: se lee exactamente igual que
// cualquier otra, con props.children.
export function PlantillaPublica(props) {
  // useNavigate() devuelve una función. Al llamarla con una ruta, por ejemplo
  // navigate('/carrito'), la aplicación cambia de página SIN recargar el navegador.
  // Solo las páginas y las plantillas la usan: los componentes de abajo (átomos,
  // moléculas y organismos) no conocen el router. Reciben la función por props y la
  // llaman cuando hace falta, así se pueden probar sin necesidad de un router.
  const navigate = useNavigate()
  const productosCtx = useProductos()
  const carrito = useCart()

  return (
    // <> y </> son un "fragmento": agrupan varios elementos sin agregar una etiqueta extra.
    <>
      <Navbar
        categorias={categoriasDe(productosCtx.productos)}
        totalItems={carrito.totalItems}
        onNavegar={navigate}
        // encodeURIComponent convierte el texto para que sea seguro dentro de una dirección:
        // por ejemplo, los espacios se reemplazan por %20.
        onBuscar={(texto) => navigate(`/buscar/${encodeURIComponent(texto)}`)}
      />
      <Container as="main" className="tienda-main">
        {props.children}
      </Container>
      <Footer onNavegar={navigate} />
    </>
  )
}
