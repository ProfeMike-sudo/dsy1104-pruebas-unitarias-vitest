import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { ShoppingCart } from '../components/organisms/ShoppingCart/ShoppingCart'
import { Button } from '../components/atoms/Button/Button'
import { useCart } from '../context/CartContext'
// El hook propio se importa igual que cualquier otra función.
import { useTituloPagina } from '../hooks/useTituloPagina'

// Página: el carrito. Si está vacío ofrece volver al catálogo.
export default function Carrito() {
  const navigate = useNavigate()
  const carrito = useCart()
  // Se llama acá: al nivel superior del componente, junto a los demás hooks,
  // antes de cualquier "if" y antes del "return".
  useTituloPagina('Carrito')

  return (
    <PlantillaPublica>
      <h2 className="h3 mb-3">Tu carrito</h2>
      <ShoppingCart />
      {carrito.items.length === 0 && (
        <Button onClick={() => navigate('/catalogo')}>Ir al catálogo</Button>
      )}
    </PlantillaPublica>
  )
}
