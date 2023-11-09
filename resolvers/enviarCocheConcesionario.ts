import { Request, Response } from "npm:express@4.18.2";
import { cocheDB, concesionarioDB } from "../db/DBs.ts";

export const enviarCocheAConcesionario = async(req: Request, res: Response) => {
  try {
        const { cocheId, concesionarioId } = req.body;

        const coche = await cocheDB.findById(cocheId);
        const concesionario = await concesionarioDB.findById(concesionarioId);

        if (!coche || !concesionario) {
            res.status(404).send("Coche o Concesionario not found");
            return;
        }

        if (concesionario.cantidadCoches >= 10) {
            res.status(200).send("Numero maximo de coches alcanzado");
            return;
        }

        concesionario.cochesID.push(coche._id);
        concesionario.cantidadCoches += 1;
        await concesionario.save();

        res.status(200).send("Coche enviado al concesionario con exito");
  } catch (error) {
        res.status(500).send(error.message);
        return;
  }
}
