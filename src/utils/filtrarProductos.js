// Aplica los filtros del catálogo sobre la lista completa de productos.
// "filtros" es un objeto con las claves texto y categoria. Igual que las props de un
// componente, se lee con filtros.texto y filtros.categoria, sin desarmarlo.
// "= {}" es el valor por defecto del parámetro: si nadie pasa filtros, se usa un
// objeto vacío en su lugar, para no romper al leer sus propiedades.
export function filtrarProductos(productos, filtros = {}) {
  const buscado = (filtros.texto || '').trim().toLowerCase()
  const categoria = filtros.categoria || ''

  return productos.filter((p) => {
    const coincideTexto = buscado === '' || p.nombre.toLowerCase().includes(buscado)
    const coincideCategoria = categoria === '' || p.categoria === categoria
    return coincideTexto && coincideCategoria
  })
}
