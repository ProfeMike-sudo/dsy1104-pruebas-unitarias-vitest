# Pruebas unitarias en React con Vite y Vitest

Proyecto de referencia para la asignatura **DSY1104 · Desarrollo Full Stack II** (Duoc UC).

Es la misma tienda de `dsy1104-tienda-react` (hooks, formularios con validación y navegación, con `props.algo` en vez de destructuring), con pruebas unitarias con **Vitest** agregadas encima: 63 pruebas, cubriendo funciones puras, componentes, hooks, contexts y un flujo de integración completo.

## Por qué Vitest y no Jasmine con Karma

Si en el material del curso viste mencionado "Jasmine y Karma", no es un error tuyo: es material desactualizado. **Vitest** es el estándar actual para proyectos con Vite: reutiliza la misma configuración de Vite, es rápido, entiende JSX sin configuración extra, y trae cobertura y mocks integrados. La idea de fondo no cambia entre una herramienta y otra: cambia solo cómo las escribes y las ejecutas.

## Cómo instalar y ejecutar

```bash
npm install
npm test              # corre las pruebas una vez
npm run test:watch    # las re-ejecuta al guardar
npm run test:coverage # genera el informe de cobertura
```

## Estructura

Igual que `dsy1104-tienda-react`, con un `.test.jsx` o `.test.js` al lado de cada archivo que prueba. Es una convención: la prueba vive pegada a lo que prueba.
