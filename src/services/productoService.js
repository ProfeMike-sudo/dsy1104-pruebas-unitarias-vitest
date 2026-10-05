// productoService: aquí vive el CRUD (Crear, Leer, Actualizar, Eliminar) de los productos.
// Son funciones de JavaScript puro: no usan React, así que se pueden probar solas.
// "import" trae algo desde otro archivo. Aquí traemos el archivo JSON con los productos
// de partida. "productosIniciales" es el nombre que le damos: una lista (arreglo) de
// productos, uno por cada objeto { id, nombre, precio, ... } del archivo.
import productosIniciales from '../data/productos.json'
// "const" crea una variable que no se puede reasignar. CLAVE es el nombre del "cajón"
// de localStorage donde guardamos la lista. localStorage es un almacenamiento del
// navegador: guarda pares clave/valor y los datos siguen ahí aunque recargues la página.
const CLAVE = 'productos'
// leer() devuelve la lista actual de productos. No lleva "export" porque es interna:
// solo la usan las otras funciones de este mismo archivo.
function leer() {
  // getItem busca lo guardado bajo esa clave. Devuelve un texto (string),
  // o null si nunca se guardó nada.
  const guardado = localStorage.getItem(CLAVE)
  // "===" compara sin convertir tipos. Si es null, es la primera vez que se usa.
  if (guardado === null) {
    // localStorage solo guarda texto, no listas. JSON.stringify convierte la lista
    // en un texto con formato JSON, y setItem lo guarda bajo la clave.
    localStorage.setItem(CLAVE, JSON.stringify(productosIniciales))
    // [...productosIniciales] hace una COPIA de la lista: los tres puntos ("spread")
    // sacan cada elemento y los meten en una lista nueva. Así nadie modifica sin
    // querer la lista original que importamos.
    return [...productosIniciales]
  }
  // JSON.parse hace lo contrario de stringify: convierte el texto guardado de vuelta
  // en una lista de objetos que sí podemos recorrer.
  return JSON.parse(guardado)
}
// guardar(lista) reemplaza lo que hay en localStorage por la lista nueva.
function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}
// "export" deja la función disponible para otros archivos.
// READ (leer): devuelve todos los productos.
export function listarProductos() {
  return leer()
}
// READ (leer uno): busca un producto por su id.
export function obtenerProducto(id) {
  // find recorre la lista y devuelve el primer elemento que cumpla la condición.
  // (p) => p.id === id es una función flecha: recibe un producto "p" y responde
  // true si su id es el que buscamos. Si nadie cumple, find devuelve undefined.
  // "?? null" significa: si el resultado es undefined, devuelve null en su lugar.
  return leer().find((p) => p.id === id) ?? null
}
// CREATE (crear): agrega un producto nuevo. "datos" trae nombre, precio, etc.
export function crearProducto(datos) {
  const lista = leer()
  // lista.map((p) => p.id) crea una lista nueva solo con los ids: [1, 2, 3, ...].
  // Math.max(0, ...ids) entrega el mayor de todos (el 0 evita error si la lista
  // está vacía). Sumarle 1 da un id que nadie está usando.
  const nuevoId = Math.max(0, ...lista.map((p) => p.id)) + 1
  // { ...datos, id: nuevoId } crea un objeto nuevo: copia todo lo de "datos"
  // y le agrega el id.
  const nuevo = { ...datos, id: nuevoId }
  // Guardamos una lista nueva: todo lo anterior más el producto nuevo.
  guardar([...lista, nuevo])
  return nuevo
}
// UPDATE (actualizar): cambia solo los campos indicados en "cambios".
export function actualizarProducto(id, cambios) {
  // map devuelve una lista del mismo largo. Si el producto tiene el id buscado, lo
  // reemplaza por una copia con los cambios encima ({ ...p, ...cambios }: primero
  // copia p y después los campos de "cambios" pisan a los anteriores).
  // Si no es el buscado, lo deja igual (: p). "a ? b : c" es un if de una línea.
  const lista = leer().map((p) => (p.id === id ? { ...p, ...cambios } : p))
  guardar(lista)
  return lista.find((p) => p.id === id) ?? null
}
// DELETE (eliminar): quita el producto con ese id.
export function eliminarProducto(id) {
  // filter se queda solo con los elementos que cumplen la condición:
  // todos los productos cuyo id sea distinto (!==) del que queremos borrar.
  guardar(leer().filter((p) => p.id !== id))
}
