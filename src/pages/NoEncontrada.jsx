import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { Button } from '../components/atoms/Button/Button'
import { useTituloPagina } from '../hooks/useTituloPagina'

// Página: se muestra cuando ninguna ruta coincide (la ruta "*" en App.jsx).
export default function NoEncontrada() {
  const navigate = useNavigate()
  useTituloPagina('Página no encontrada')

  return (
    <PlantillaPublica>
      <h2 className="h3 mb-3">Página no encontrada</h2>
      <p>No existe una página en esta dirección.</p>
      <Button onClick={() => navigate('/catalogo')}>Ir al catálogo</Button>
    </PlantillaPublica>
  )
}
