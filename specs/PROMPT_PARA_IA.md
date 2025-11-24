# Prompt de Definición de Producto: EduNexus (MVP)

**Rol de la IA:** Actúa como un Arquitecto de Software Senior y Desarrollador Full Stack especializado en EdTech (Tecnología Educativa).

**Objetivo del Proyecto:**
Crear una aplicación web (Single Page Application) que sirva como repositorio centralizado de recursos educativos. La plataforma debe conectar a tres tipos de usuarios (Profesores, Alumnos, Padres) con material curado y organizado por materias y categorías extracurriculares.

## 1. Alcance Funcional (MVP)

### Estructura de Datos ("La Base de Datos")
El sistema debe gestionar recursos categorizados. Estructura propuesta:
- **Materias Académicas:** Lengua Castellana, Catalán, Inglés, Medio Social/Natural, Matemáticas.
- **Vida Escolar:** Informaciones Generales, Actividades Culturales, Extraescolares.
- **Metadatos del Recurso:** Título, Descripción, Tipo (PDF, Link, Video), Etiquetas, Nivel (Primaria/Secundaria), Visibilidad (Público/Solo Profesores).

### Perfiles de Usuario
1.  **Vista Pública (Padres/Alumnos):** Acceso a materiales de estudio, calendarios de actividades y recursos de repaso. Diseño limpio y accesible.
2.  **Vista Interna (Profesores):** Acceso a planificaciones, recursos didácticos avanzados y notas internas.

### Funcionalidades Clave
1.  **Explorador de Recursos:** Interfaz tipo "Grid/Bento" para navegar visualmente por materias.
2.  **Buscador Inteligente:** Filtrado por texto, materia y tipo de archivo.
3.  **Asistente IA (Gemini):** Un chat integrado que permite a los padres preguntar cosas como "¿Qué recursos hay para mejorar la lectura en inglés?" y obtener respuestas basadas en la base de datos existente.

## 2. Requisitos Técnicos

- **Frontend:** React 18+ con TypeScript.
- **Estilos:** Tailwind CSS. El diseño debe ser "Institucional pero Moderno" (Paleta de azules, blancos, tipografía legible).
- **Estado/Datos:** Al no tener backend real en esta fase, usar un "Mock Database" en un archivo de constantes o Context API.
- **IA:** Integración con Google Gemini API (`gemini-2.5-flash`) para el asistente virtual y generación de resúmenes de recursos.
- **Navegación:** `react-router-dom` (o manejo de estado de vista) para navegación fluida sin recargas.

## 3. Guía de Diseño (UI/UX)
- **Estética:** Minimalista, uso de "Cards" con sombras suaves, bordes redondeados. Iconografía clara (usar Lucide-React).
- **Accesibilidad:** Alto contraste, fuentes grandes para lectura fácil.
- **Mobile-First:** La aplicación debe funcionar perfectamente en móviles (para padres) y tablets (para alumnos).

## Instrucción de Ejecución
Genera el código completo para esta aplicación, priorizando la estructura de archivos, la definición de tipos en TypeScript y una interfaz visualmente impactante desde el primer momento.