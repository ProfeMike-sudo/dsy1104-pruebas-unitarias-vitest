import { createContext, useContext, useState } from 'react'

// Contexto que guarda el estado del carrito y expone las acciones para modificarlo.
// Separar la lógica de estado del renderizado facilita probar cada pieza por separado.
const CartContext = createContext(null)

// CartProvider es el componente que "llena" la caja del carrito. Como cualquier
// componente, recibe sus datos por "props"; lo que va entre <CartProvider> y
// </CartProvider> llega en props.children.
export function CartProvider(props) {
  const [items, setItems] = useState([])

  function add(producto) {
    setItems((actual) => {
      const existente = actual.find((i) => i.producto.id === producto.id)
      if (existente) {
        return actual.map((i) =>
          i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i,
        )
      }
      return [...actual, { producto, cantidad: 1 }]
    })
  }

  function remove(id) {
    setItems((actual) => actual.filter((i) => i.producto.id !== id))
  }

  function increment(id) {
    setItems((actual) =>
      actual.map((i) => (i.producto.id === id ? { ...i, cantidad: i.cantidad + 1 } : i)),
    )
  }

  // reduce recorre la lista acumulando un resultado: aquí suma las cantidades.
  const totalItems = items.reduce((suma, i) => suma + i.cantidad, 0)
  const totalPrecio = items.reduce((suma, i) => suma + i.producto.precio * i.cantidad, 0)

  const valor = { items, add, remove, increment, totalItems, totalPrecio }

  return <CartContext.Provider value={valor}>{props.children}</CartContext.Provider>
}

// Hook para consumir el contexto desde cualquier componente.
export function useCart() {
  const contexto = useContext(CartContext)
  if (!contexto) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return contexto
}
