# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


--------------------------
## 🛒 Avances del Sprint 4 - Guest Checkout & Persistencia

### ✨ Nuevas Funcionalidades
- **Guest Checkout (Flujo de Invitado):** Proceso de compra modular de 3 pasos (`Carrito` ➔ `Datos de Envío` ➔ `Confirmación`).
- **Persistencia de Datos:** Integración de `localStorage` para conservar los productos del carrito al recargar la página.
- **Formulario de Envío:** Captura y validación de datos de contacto (nombre, email, dirección, teléfono).

### 🛠️ Correcciones e Interfaz
- Cierre del modal lateral mediante clic en área oscura (*overlay*) con prevención de propagación de eventos.
- Reinicio automático del carrito y formulario tras la confirmación del pedido.
