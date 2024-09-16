# "Despliegue la Aplicación '295topics' con Docker , Docker Compose, k8s usando minikube y CICD usando Gitlab-CI"

### Arquitectura:

Esta aplicación consta de tres componentes principales:

- Frontend en Node.js y Express: Este componente sirve contenido web en el puerto 3000. Deberás crear un Dockerfile para el frontend, construir la imagen y publicarla en Docker Hub.

- Backend en TypeScript: Este componente se ejecuta en el puerto 5000 y se conecta a una base de datos MongoDB. Deberás crear un Dockerfile para el backend, construir la imagen y publicarla en Docker Hub.

- Base de Datos MongoDB: La base de datos se iniciará a través de un contenedor de MongoDB. Además, deberás proporcionar un archivo mongo-init.js que cargue datos iniciales en la base de datos cuando se inicie el contenedor de MongoDB.


### Frontend en Node.js y Express:

- Se proporciona el código fuente del frontend en Node.js y Express 
el mismo utiliza el puerto 3000 para exponerse a Internet.
- Crea un Dockerfile para el frontend que incluya todas las dependencias necesarias y establezca el comando de inicio.
- Construye la imagen del frontend utilizando el Dockerfile.
- Publica la imagen en Docker Hub.
- Se debe tomar en cuenta que consume el endpoint del backend
a traves de la variable `API_URI` en donde se conectara con el backend

Por ejemplo: `API_URI: http://topics-api:5000/api/topics`

### Pruebas front
    Se puede realizar pruebas de conexion `http://localhost:3000`
    Recuerden siempre revisar los logs

    tomar en cuenta variables de entorno:
    
    API_URI= 
    LOCAL = 
    HOST = 
    PORT = 
    

### Backend en TypeScript:

- Se Proporciona el código fuente del backend en TypeScript que utiliza el puerto 5000 y se conecta a una base de datos MongoDB.
- Crea un Dockerfile para el backend que incluya todas las dependencias necesarias y establezca el comando de inicio.
- Construye la imagen del backend utilizando el Dockerfile.
- Publica la imagen en Docker Hub.

tomar en cuenta variables de entorno:

DATABASE_URL=
DATABASE_NAME=
HOST=
PORT=


en el archivo config.ts estan las variables de conexion a la base de datos

```
export default {
    database: {
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017',
        name: process.env.DATABASE_NAME || 'TopicstoreDb'
    },
    app: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 5000
    }
}
```
Es importante el uso de las variables de entorno

### Pruebas backend
    Se puede realizar pruebas de conexion `http://localhost:5000/api/topics`


### Base de Datos MongoDB:

Se entrega archivo mongo-init.js en la [ruta](../295topics-fullstack/db/mongo-init.js)  que sirve para  precargar datos a la base de datos MongoDB.
se debe configurar un contenedor Docker para ejecutar una instancia de MongoDB.
Utiliza el archivo mongo-init.js para precargar datos en la base de datos.

### Pruebas mongodb
    Pueden usar el contenedor para conectarse y revisar la ingesta de los datos o usar directamente mongo express
    los pasos seria siguiente:

### Se agregan registros a la base de datos
```bash
docker exec -it some-mongo mongosh

> use TopicstoreDb

> db.Topics.insertOne({Name:"Docker"})

> db.Topics.insertOne({Name:"Kubernetes"})
> show collections;
> db.Topics.find();

### Para realizar el despliegue en Kubernetes a traves de Helm Charts
helm repo add gitlab https://charts.gitlab.io
#Se puede realizar por la via de crear un fichero values.yml
helm install --namespace <NAMESPACE> gitlab-runner -f <CONFIG_VALUES_FILE> gitlab/gitlab-runner
#Se puede realizar por la via de pasarle directamente al comando las variables de entorno
helm install --namespace <NAMESPACE> gitlab-runner-k8s gitlab/gitlab-runner --set gitlabUrl=<URL_SERVER_GITLAB> --set runnerRegistrationToken=<TOKEN_REGISTRATION>

