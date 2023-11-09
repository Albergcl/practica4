import { Request, Response } from "npm:express@4.18.2";
import { cocheDB, concesionarioDB } from "../db/DBs.ts";

export const eliminarCocheConcesionario = async(req: Request, res: Response) => {
  try {
        const { concesionarioId, cocheId } = req.body;

        const concesionario = await concesionarioDB.findById(concesionarioId);
        const coche = await cocheDB.findById(cocheId);

        if (!concesionario || !coche) {
            res.status(404).send("Coche o Concesionario not found");
            return;
        }

        concesionario.cochesID = concesionario.cochesID.filter((coche) => coche.toString() !== cocheId);
        await concesionario.save();

        res.status(200).send("Coche eliminado con exito");
  } catch (error) {
        res.status(500).send(error.message);
        return;
  }
}
