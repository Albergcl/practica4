import mongoose from "npm:mongoose@7.6.3";
import { Coche, MOTORTYPE, COCHETYPE, Cliente, Concesionario } from "../types.ts";

const Schema = mongoose.Schema;

const cocheSchema = new Schema(
  {
    precio: { type: Number, required: true },
    tipo: { type: String, enum: COCHETYPE, required: true},
    tipoMotor: { type: String, enum: MOTORTYPE, required: true }, 
    marca: {type: String, required: true},
    matricula: {type: String, required: true},
    propietario: {type: mongoose.Types.ObjectId, ref: "Cliente", required: true},
  },
  { timestamps: true }
);

const clienteSchema = new Schema(
    {
      dinero: {type: Number, required: true},
      dni: {type: String, required: true},
      nombre: {type: String, required: true}
    },
    { timestamps: true }
);

const concesionarioSchema = new Schema(
  {
    coches: {type: mongoose.Types.ObjectId, ref: "Coche", required: true},
    clientes: {type: mongoose.Types.ObjectId, ref: "Cliente", required: true},
    cantidadCoches: { type: Number, default: 0 },
    id: {type: String, required: true}
  }
);

export type CocheModelType = mongoose.Document & Omit<Coche, "id">;
export type ClienteModelType = mongoose.Document & Omit<Cliente, "id">;
export type ConcesionarioModelType = mongoose.Document & Omit<Concesionario, "id">;

export const cocheDB = mongoose.model<CocheModelType>("Coche", cocheSchema);
export const clienteDB = mongoose.model<ClienteModelType>("Cliente", clienteSchema);
export const concesionarioDB = mongoose.model<ConcesionarioModelType>("Concesionario", concesionarioSchema);