// Devuelve la lista de categorías sin repetir, en el orden en que aparecen.
// Un Set es una colección que descarta los repetidos; [...set] la vuelve lista.
export function categoriasDe(productos) {
  return [...new Set(productos.map((p) => p.categoria))]
}
