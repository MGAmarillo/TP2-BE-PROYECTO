# Taller de Programación 2
# Gym Meetings

Plataforma ideada con el fin de conectar a profesores y alumnos de distintas actividades deportivas.

Funcionalidades Principales
- Permitir el registro de usuarios (alumnos y profesores)
- Los profesores pueden dar de alta las clases que tienen disponibles (deporte, fecha, hora, y lugar).
- Los alumnos pueden buscar y anotarse o borrarse de las clases disponibles de los distintos deportes. 

Listado de Endpoints

- Profesores
    - GET: /api/profesores/
    - POST: /api/profesores/
    - POST: /api/profesores/login
    - POST: /api/profesores/altaClase/[id]

- Alumnos
    - GET: /api/alumnos/
    - GET: /api/alumnos/[id]
    - POST: /api/alumnos/
    - DELETE: /api/alumnos/[id]
    - PUT: /api/alumnos/[id]
    - POST: /api/alumnos/login
    - POST: /api/alumnos/anotarseClase/[idAlumno]
    - POST: /api/alumnos/cancelarClase/[idAlumno]

- Clases
    - GET: /api/clases/
    - GET: /api/clases/[id]

- Deportes
    - GET: /api/deportes/
    - POST: /api/deportes/

Notas:
- La aplicación usa el puerto 3002 (http://localhost:3002)
- Antes de ejecutar el programa, se recomienda ejecutar el comando 'npm install'
- Se puede ejecutar el programa con 'npm run start-dev' para usar nodemon

Integrantes del grupo:
- Amarillo Mateo
- Da Costa Sofía
- Nicolucci Tomás
- Rodríguez Ignacio