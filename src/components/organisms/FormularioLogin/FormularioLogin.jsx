// useState guarda un dato que puede cambiar. Cuando cambia, React vuelve a dibujar.
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { Button } from '../../atoms/Button/Button'
// Cada validación revisa un valor y devuelve un mensaje de error ('' si está bien).
import { validarEmail, validarClave } from '../../../utils/validaciones'

// Organismo: formulario de inicio de sesión con validación hecha en React.
// "props.onEnviar" es una función que la página nos entrega: la llamamos cuando todo
// está bien.
export function FormularioLogin(props) {
  // Un useState por cada dato. useState('') parte con texto vacío y devuelve dos cosas:
  // el valor actual (email) y la función que lo cambia (setEmail).
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  // errores es un objeto con un mensaje por campo, por ejemplo { email: '...', clave: '' }.
  // Parte vacío: al principio no se muestra ningún error.
  const [errores, setErrores] = useState({})

  // Se ejecuta cuando la persona envía el formulario (botón "Ingresar" o tecla Enter).
  function manejarEnvio(evento) {
    // Por defecto el navegador recarga la página al enviar un formulario.
    // preventDefault() cancela esa recarga.
    evento.preventDefault()

    // Validamos cada campo: cada función devuelve un mensaje o '' si está correcto.
    const nuevos = { email: validarEmail(email), clave: validarClave(clave) }
    setErrores(nuevos)

    // Solo si los dos mensajes están vacíos (todo correcto) avisamos a la página.
    if (nuevos.email === '' && nuevos.clave === '') {
      props.onEnviar({ email })
    }
  }

  // onSubmit conecta el formulario con manejarEnvio. noValidate desactiva los mensajes
  // propios del navegador para que se vean los nuestros.
  return (
    <Form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario id="login-email" etiqueta="Correo" tipo="email" valor={email} onChange={setEmail} error={errores.email} />
      <CampoFormulario id="login-clave" etiqueta="Clave" tipo="password" valor={clave} onChange={setClave} error={errores.clave} />
      <Button type="submit">Ingresar</Button>
    </Form>
  )
}
