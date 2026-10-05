import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductosProvider } from './context/ProductosContext'
import { CartProvider } from './context/CartContext'
import Catalogo from './pages/Catalogo'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import AdminProductos from './pages/AdminProductos'
import NoEncontrada from './pages/NoEncontrada'

// Las rutas de la tienda. Los dos "provider" envuelven todo: así cualquier página
// puede leer productos y carrito con useProductos() / useCart(), sin pasarlos por props.
export default function App() {
  return (
    <ProductosProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/categoria/:nombre" element={<Catalogo />} />
            <Route path="/buscar/:texto" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/productos" element={<AdminProductos />} />
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ProductosProvider>
  )
}
