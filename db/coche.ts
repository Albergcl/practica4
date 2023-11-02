import mongoose from "npm:mongoose@7.6.3";
import { Coche, MOTORTYPE, COCHETYPE } from "../types.ts";

const Schema = mongoose.Schema;

const cocheSchema = new Schema(
  {
    precio: { type: Number, required: true },
    tipo: { type: String, enum: COCHETYPE, required: true},
    tipoMotor: { type: String, enum: MOTORTYPE, required: true }, 
    marca: {type: String, required: true},
    matricula: {type: String, required: true},
    propietario: {type: String, required: true},
  },
  { timestamps: true }
);

export type CocheModelType = mongoose.Document & Omit<Coche, "id">;

export default mongoose.model<CocheModelType>("Animal", cocheSchema);