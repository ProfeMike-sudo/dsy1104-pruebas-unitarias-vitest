import { useNavigate, useParams } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { ProductCatalog } from '../components/organisms/ProductCatalog/ProductCatalog'
import { useProductos } from '../context/ProductosContext'
import { useCart } from '../context/CartContext'
import { filtrarProductos } from '../utils/filtrarProductos'
import { useTituloPagina } from '../hooks/useTituloPagina'

// Página: catálogo con filtros. Sirve para tres rutas (ver App.jsx):
//   /catalogo            todos los productos
//   /categoria/:nombre   los de una categoría
//   /buscar/:texto       el resultado de una búsqueda
// Un ":nombre" en la ruta es un parámetro: la parte de la dirección que cambia.
// En /categoria/Audio, nombre vale "Audio".
export default function Catalogo() {
  // useNavigate: función para cambiar de página (por ejemplo navigate('/catalogo')).
  const navigate = useNavigate()
  // useParams entrega un objeto con los parámetros de la dirección actual. Se leen
  // con params.nombre y params.texto, igual que cualquier otro objeto con props.
  const params = useParams()
  // "??" da un valor por defecto: si la ruta no trae ese parámetro (por ejemplo en
  // /catalogo), queda como texto vacío en vez de "undefined".
  const nombre = params.nombre ?? ''
  const texto = params.texto ?? ''
  const productosCtx = useProductos()
  const carrito = useCart()

  const visibles = filtrarProductos(productosCtx.productos, { texto, categoria: nombre })

  // "let" crea una variable que sí puede cambiar de valor (a diferencia de "const").
  let titulo = 'Catálogo completo'
  if (nombre) titulo = nombre
  if (texto) titulo = `Resultados para "${texto}"`
  useTituloPagina(titulo)

  return (
    <PlantillaPublica>
      <h2 className="h3 mb-3">{titulo}</h2>
      <ProductCatalog productos={visibles} onAdd={carrito.add} />
    </PlantillaPublica>
  )
}
