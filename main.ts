import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { crearCoche } from "./resolvers/crearCoche.ts";
import { crearCliente } from "./resolvers/crearCliente.ts";
import { crearConcesionario } from "./resolvers/crearConcesionario.ts";
import { enviarCocheAConcesionario } from "./resolvers/enviarCocheConcesionario.ts";
import { verCochesDeConcesionario } from "./resolvers/verCochesConcesionario.ts";
import { venderCoche } from "./resolvers/venderCoche.ts";
import { verCochesCliente } from "./resolvers/verCochesCliente.ts";
import { eliminarCocheCliente } from "./resolvers/eliminarCocheCliente.ts";
import { eliminarCocheConcesionario } from "./resolvers/eliminarCocheConcesionario.ts";
import { anadirDinero } from "./resolvers/anadirDinero.ts";
import { traspasarCocheClientes } from "./resolvers/traspasarCocheClientes.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";  //estas dos lineas leen el archivo .env y lo cargan en la varaible env

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
    console.log("No mongo URL found");
    Deno.exit(1);
  }
  
await mongoose.connect(MONGO_URL); //Conectarse a mongo
const app = express();

app.post("/coche", crearCoche)
   .post("/cliente", crearCliente)
   .post("/concesionario", crearConcesionario)
   .post("/concesionario/enviarCoche", enviarCocheAConcesionario)
   .get("/concesionario/coches/:concesionarioID", verCochesDeConcesionario)
   .post("/cliente/venderCoche", venderCoche)
   .get("/cliente/coches/:clienteID", verCochesCliente)
   .delete("/concesionario/eliminarCoche", eliminarCocheConcesionario)
   .delete("/cliente/eliminarCoche", eliminarCocheCliente)
   .post("/cliente/traspasarCoche", traspasarCocheClientes)
   .post("/cliente/anadirDinero", anadirDinero)

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})