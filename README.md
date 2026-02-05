# 🌐 GameFest 2025 - Frontend

![Vue](https://img.shields.io/badge/Vue_3-42b883?style=flat-square&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![PrimeVue](https://img.shields.io/badge/PrimeVue-339AF0?style=flat-square&logo=primevue&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

El frontend de **GameFest**, es una Single Page Application (SPA) moderna, rápida y altamente interactiva.

---

## ✨ Características del Frontend

- **🎨 UI Premium**: Componentes de alta calidad gracias a **PrimeVue** (v4+).
- **🌊 Diseño Fluido**: Estilizado con **Tailwind CSS** para un control total sobre el layout.
- **⚡ Proximidad**: Construido sobre **Vite** para una experiencia de desarrollo instantánea.
- **🔄 Estado Global**: Gestión eficiente de datos con **Pinia**.
- **🚦 Navegación**: Enrutamiento dinámico con **Vue Router**.

---

## 🛠️ Requisitos de Desarrollo

- **Node.js**: v20 o superior.
- **Gestor de paquetes**: npm (o bun, según tu preferencia).

---

## 🚀 Configuración del Proyecto

### 1. Instalación de dependencias

```bash
npm install
```

### 2. Desarrollo con Hot-Reload

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### 3. Construcción para producción

```bash
npm run build
```

Esto genera la carpeta `dist/` lista para ser desplegada en un servidor web (Nginx/Apache).

---

## 📁 Estructura de Carpetas

- `src/views/`: Páginas principales (Home, Games, Events, Admin, etc.).
- `src/components/`: Componentes reutilizables (Botones, Cards, Layouts).
- `src/stores/`: Lógica de estado global (Pinia).
- `src/services/`: Comunicación con la API del Backend.
- `src/assets/`: Imágenes, estilos globales y fuentes.

---

## 🔧 Configuración de API

El frontend se comunica con el backend mediante la variable de entorno definida en los archivos `.env`. Por defecto:

- **Dev**: Conecta a `http://localhost:8080/api`.
- **Producción**: Utiliza la URL configurada en el servidor de despliegue.
