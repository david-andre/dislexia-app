# Dislexia App

Aplicación web para actividades de apoyo en lectura y dislexia.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** para estilos
- **React Router v6** para rutas
- **TanStack Query** para datos del servidor
- **Zustand** para estado global
- **React Hook Form** + **Zod** para formularios

## Requisitos

- Node.js 18+
- npm o pnpm

## Configuración

1. Clonar el repositorio
2. Copiar `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
3. Configurar `VITE_API_URL` en `.env` con la URL de tu backend (por defecto `http://localhost:4000`)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Build

```bash
npm run build
```

## Preview del build

```bash
npm run preview
```

## Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables
├── features/       # Módulos por funcionalidad (auth, etc.)
├── hooks/          # Hooks personalizados
├── lib/            # Utilidades y API
├── stores/         # Estado global (Zustand)
├── types/          # Tipos TypeScript
└── views/          # Páginas y vistas
```

## Backend

El backend debe estar en un repositorio separado. La API espera los siguientes endpoints:

- `POST /api/user/supervisor/login` - Inicio de sesión
- `POST /api/user/supervisor/register` - Registro
- `GET /api/user/supervisor` - Usuario actual
- `GET /api/user/children` - Lista de niños
- `POST /api/user/children` - Registrar niño
- `POST /api/activities` - Enviar actividad
- `GET /api/reports` - Reportes/estadísticas
