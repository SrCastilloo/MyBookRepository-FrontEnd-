# My Book Repository — Frontend

Aplicación móvil desarrollada con React Native y Expo para gestionar una biblioteca personal, registrar libros y controlar el progreso de lectura.

Este repositorio contiene el frontend de la aplicación. Los datos, usuarios y libros se gestionan mediante una API REST desarrollada con Spring Boot.

## Estado del proyecto

El frontend se encuentra actualmente en desarrollo.

Actualmente incluye:

* Pantalla de bienvenida.
* Diseño visual inicial.
* Recursos gráficos personalizados.
* Configuración de Expo Router.
* Tipografías personalizadas mediante Expo Google Fonts.

Funcionalidades previstas:

* Registro de usuarios.
* Inicio de sesión mediante JWT.
* Consulta de libros del usuario.
* Creación de libros.
* Modificación del progreso de lectura.
* Eliminación de libros.
* Modificación del perfil del usuario.
* Cierre de sesión.

## Tecnologías utilizadas

* React Native
* Expo
* TypeScript
* Expo Router
* Expo Image
* Expo Google Fonts
* Spring Boot REST API
* JWT para autenticación

## Repositorios

* Frontend: [MyBookRepository-FrontEnd](https://github.com/SrCastilloo/MyBookRepository-FrontEnd-)
* Backend: [MyBookRepository-Backend](https://github.com/SrCastilloo/MyBookRepository-Backend-)

## Requisitos previos

Antes de ejecutar el proyecto necesitas tener instalado:

* Node.js
* npm
* Expo Go en el dispositivo móvil, o un emulador de Android/iOS
* Git

También es necesario tener el backend de Spring Boot ejecutándose.

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/SrCastilloo/MyBookRepository-FrontEnd-.git
```

Accede al proyecto:

```bash
cd MyBookRepository-FrontEnd-
```

Instala las dependencias:

```bash
npm install
```

Inicia la aplicación:

```bash
npx expo start
```

Desde la terminal de Expo podrás abrir la aplicación en:

* Expo Go.
* Emulador de Android.
* Simulador de iOS.
* Navegador web.

## Configuración de la API

Crea un archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_API_URL=http://DIRECCION_IP:8080/api/v1
```

Ejemplo para un dispositivo físico conectado a la misma red Wi-Fi:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.100:8080/api/v1
```

La dirección depende del dispositivo utilizado:

| Entorno            | Dirección del backend                       |
| ------------------ | ------------------------------------------- |
| Navegador web      | `http://localhost:8080/api/v1`              |
| Emulador Android   | `http://10.0.2.2:8080/api/v1`               |
| Dispositivo físico | `http://IP_LOCAL_DEL_ORDENADOR:8080/api/v1` |

En un teléfono físico no se debe utilizar `localhost`, porque haría referencia al propio teléfono y no al ordenador donde se ejecuta Spring Boot.

Después de modificar `.env`, reinicia Expo:

```bash
npx expo start -c
```

## Estructura principal

```text
MyBookRepository-FrontEnd-
├── assets
│   └── images
│       └── bookimage.png
├── src
│   └── app
│       ├── _layout.tsx
│       └── index.tsx
├── .gitignore
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

A medida que crezca el proyecto se podrán añadir:

```text
src
├── app
├── components
├── context
├── hooks
├── services
├── types
└── utils
```

## Autenticación

El inicio de sesión se realizará contra la API de Spring Boot. Cuando las credenciales sean correctas, el backend devolverá un token JWT.

Las peticiones protegidas enviarán el token mediante la cabecera:

```http
Authorization: Bearer ACCESS_TOKEN
```

El identificador del usuario no se enviará manualmente. El backend lo obtendrá del contenido del JWT.

## Comandos útiles

Iniciar Expo:

```bash
npx expo start
```

Iniciar limpiando la caché:

```bash
npx expo start -c
```

Abrir en Android:

```bash
npm run android
```

Abrir en web:

```bash
npm run web
```

Ejecutar ESLint:

```bash
npx expo lint
```

## Autor

Desarrollado por [Daniel Castillo](https://github.com/SrCastilloo).
