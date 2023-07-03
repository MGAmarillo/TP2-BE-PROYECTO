# Taller de Programación 2
# Gym Meetings
--- 
Funcionalidades Principales
- Permitir el registro de usuarios (alumnos y profesores)
- Los profesores pueden dar de alta o baja las clases que tienen disponibles (fecha, hora, y deporte).
- Los alumnos pueden buscar e anotarse o borrarse de las clases disponibles de los distintos deportes.

Recomendaciones al instalar:
Realizar un npm install en consola antes de correr el proyecto
El proyecto corre en el puerto 3002, pero se puede cambiar en la carpeta bin/www

Endpoints:
ALUMNOS:
- GET api/alumnos
- GET api/alumnos/[mail]
- POST api/alumnos (NECESITA[req.body])
- DELETE api/alumnos/[mail]
- PUT api/alumnos[mail] (NECESITA[req.body])
- POST api/alumnos/inscribirse/[mail]/[id]
- DELETE api/alumnos/cancelarClase/[mail]/[id]
- POST api/alumnos/login (NECESITA[req.body])
- GET api/alumnos/verify/token

PROFESORES:
- GET api/profesores
- GET api/profesores/[mail]
- POST api/profesores (NECESITA[req.body])
- DELETE api/profesores/[mail]
- PUT api/profesores/[mail] (NECESITA[req.body])
- POST api/profesores/altaClase/[mail] (NECESITA[req.body])
- DELETE api/profesores/cancelarClase/[mail]/[id]
- POST api/profesores/login (NECESITA[req.body])
- GET api/profesores/verify/token

CLASES:
- GET api/clases
- GET api/clases/porDeporte/[deporte]
- GET api/clases/porProfesor/[nombre]/[apellido]

DEPORTES:
- GET api/deportes
- GET api/deportes/[nombre]
- POST api/deportes (NECESITA[req.body])
- DELETE api/deportes/[nombre]



Integrantes:
- Tomás Nicolucci
- Sofía Da Costa
- Ignacio Rodríguez
- Mateo Amarillo
