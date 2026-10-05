// "Form" viene de React Bootstrap: trae el grupo, la etiqueta y el campo ya con estilo.
import { Form } from 'react-bootstrap'

// Molécula: una etiqueta (label), un campo (input) y su mensaje de error.
// Es un campo "controlado": no guarda el texto por su cuenta. El valor le llega de afuera
// en props.valor y, cada vez que la persona escribe, avisa con props.onChange.
// "error = ''" y "tipo = 'text'" son valores por defecto: se usan si nadie envía esa prop.
export function CampoFormulario(props) {
  const error = props.error ?? ''
  const tipo = props.tipo ?? 'text'

  return (
    // controlId une la etiqueta con su campo: al hacer clic en la etiqueta se enfoca el campo.
    <Form.Group className="mb-3" controlId={props.id}>
      <Form.Label>{props.etiqueta}</Form.Label>
      <Form.Control
        type={tipo}
        // value es lo que se ve dentro del campo. Siempre sale de React, no del navegador.
        value={props.valor}
        // onChange se ejecuta con cada letra. "e" es el evento y e.target.value es el
        // texto completo que hay ahora en el campo: se lo pasamos al componente padre.
        onChange={(e) => props.onChange(e.target.value)}
        // error !== '' es true cuando hay un mensaje. isInvalid pinta el campo en rojo y
        // aria-invalid le avisa lo mismo a los lectores de pantalla.
        isInvalid={error !== ''}
        aria-invalid={error !== ''}
      />
      {/* Feedback muestra el mensaje debajo del campo, solo cuando el campo es inválido. */}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  )
}
