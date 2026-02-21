# Nimble Gravity Challenge

Mini aplicacion en React con TypeScript para el challenge de Nimble Gravity. Permite a candidatos buscar sus datos, ver posiciones abiertas y postularse ingresando la URL de su repositorio de GitHub.

## Tech Stack

- React 19
- TypeScript 5.9
- Vite 7.3
- CSS Modules

## Requisitos

- Node.js 18+
- npm o pnpm

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/nimble-gravity-challenge.git
cd nimble-gravity-challenge

# Configurar variables de entorno
cp .env.example .env

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

La aplicacion estara disponible en `http://localhost:5173`

## Build para produccion

```bash
npm run build
```

Los archivos de produccion se generan en la carpeta `dist/`.

## Estructura del proyecto

```
src/
├── services/     # Llamadas a la API
├── types/        # Interfaces de TypeScript
├── hooks/        # Custom hooks (useFetch, useCandidate, useJobs, useApply)
├── features/     # Features especificas (candidate)
├── components/   # Componentes reutilizables (ui, JobList, JobItem)
└── utils/        # Funciones de utilidad (validaciones)
```

## Flujo de la aplicacion

1. El usuario ingresa su email para obtener sus datos de candidato
2. Se muestra la lista de posiciones disponibles
3. El usuario selecciona una posicion e ingresa la URL de su repositorio de GitHub
4. Se envia la postulacion a la API

## Caracteristicas implementadas

- Formulario de busqueda de candidato por email
- Listado de posiciones obtenido de la API
- Formulario de postulacion con validacion de URL de GitHub
- Manejo de estados de carga y error
- Mensajes de error descriptivos obtenidos del body de la respuesta de la API
- Validacion en tiempo real de la URL del repositorio
- CSS Modules para estilos encapsulados

## API

La URL de la API se configura en el archivo `.env` mediante la variable `VITE_API_URL`. 

1. Crear archivo `.env` basado en `.env.example`
2. Solicitar la URL base de la API al equipo de Nimble Gravity
3. Guardarla en el archivo `.env`

Endpoints disponibles:

- `GET /api/candidate/get-by-email?email={email}` - Obtener datos del candidato
- `GET /api/jobs/get-list` - Listar posiciones abiertas  
- `POST /api/candidate/apply-to-job` - Enviar postulacion
