import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { FormularioLogin } from '../components/organisms/FormularioLogin/FormularioLogin'
import { useTituloPagina } from '../hooks/useTituloPagina'

// Página: inicio de sesión. El formulario avisa con onEnviar cuando los datos son válidos.
export default function Login() {
  const navigate = useNavigate()
  useTituloPagina('Ingresar')

  return (
    <PlantillaPublica>
      <h2 className="h3 mb-3">Ingresar</h2>
      <FormularioLogin onEnviar={() => navigate('/catalogo')} />
    </PlantillaPublica>
  )
}
