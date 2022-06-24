# Taller de Programación 2
# Gym Meetings
--
Plataforma ideada con el fin de conectar a profesores y alumnos de distintas actividades deportivas.

Funcionalidades Principales
- Permitir el registro de usuarios (alumnos y profesores)
- Los profesores pueden dar de alta o baja las clases que tienen disponibles (deporte, fecha, hora, y lugar).
- Los alumnos pueden buscar y anotarse o borrarse de las clases disponibles de los distintos deportes. 

Listado de Endpoints

- Profesores
    - GET: /api/profesores/
    - POST: /api/profesores/
    - POST:/api/profesores/login
    - POST: /api/profesores/altaClase/[id]

- Alumnos
    - GET: /api/alumnos/
    - GET: /api/alumnos/[id]
    - POST: /api/alumnos/
    - DELETE: /api/alumnos/[mail]
    - PUT: /api/alumnos/[mail]
    - POST: /api/alumnos/login
    - POST: /api/alumnos/anotarseClase/[idAlumno]

- Clases
    - GET: /api/clases/
    - POST: /api/clases/
    -
    - 

- Deportes
    - GET: /api/deportes/
    - POST: /api/deportes/