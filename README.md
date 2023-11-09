# Documentación de la API

Esta API permite realizar diversas acciones relacionadas con coches, clientes y concesionarios. A continuación se detallan los endpoints disponibles:



### Crear un coche

- **Endpoint:** `/coches`
- **Método HTTP:** POST
- **Parámetros:** { precio, tipo, tipoMotor, marca, matricula, propietarioId }
- **Descripción:** Crea un nuevo coche en la base de datos.

### Eliminar un coche

- **Endpoint:** `/coches/:cocheId`
- **Método HTTP:** DELETE
- **Descripción:** Elimina un coche de la base de datos.



### Crear un cliente

- **Endpoint:** `/clientes`
- **Método HTTP:** POST
- **Parámetros:** { dinero, dni, nombre }
- **Descripción:** Crea un nuevo cliente en la base de datos.

### Vender un coche a un cliente

- **Endpoint:** `/clientes/venderCoche`
- **Método HTTP:** POST
- **Parámetros:** { cocheId, clienteId }
- **Descripción:** Vende un coche a un cliente y actualiza el saldo del cliente.



### Crear un concesionario

- **Endpoint:** `/concesionarios`
- **Método HTTP:** POST
- **Parámetros:** { id }
- **Descripción:** Crea un nuevo concesionario en la base de datos.

### Enviar coche a un concesionario

- **Endpoint:** `/concesionarios/enviarCoche`
- **Método HTTP:** POST
- **Parámetros:** { cocheId, concesionarioId }
- **Descripción:** Envía un coche a un concesionario y verifica la restricción de cantidad de coches.

### Ver coches de un concesionario

- **Endpoint:** `/concesionarios/:concesionarioId/coches`
- **Método HTTP:** GET
- **Descripción:** Obtiene la lista de coches en posesión de un concesionario.



### Traspasar un coche de un cliente a otro

- **Endpoint:** `/clientes/traspasarCoche`
- **Método HTTP:** POST
- **Parámetros:** { cocheId, clienteOrigenId, clienteDestinoId }
- **Descripción:** Traspasa un coche de un cliente a otro.

### Añadir dinero a un cliente

- **Endpoint:** `/clientes/anadirDinero`
- **Método HTTP:** POST
- **Parámetros:** { clienteId, cantidad }
- **Descripción:** Añade dinero a la cuenta de un cliente.
