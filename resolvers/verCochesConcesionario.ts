import { Request, Response } from "npm:express@4.18.2";
import { concesionarioDB } from "../db/DBs.ts";

export const verCochesDeConcesionario = async(req: Request, res: Response) => {
  try {
        const { concesionarioId } = req.params;

        const concesionario = await concesionarioDB.findById(concesionarioId).populate("coches"); //https://mongoosejs.com/docs/populate.html#population

        if (!concesionario) {
            res.status(404).send("Concesionario not found");
            return;
        }

        res.status(200).send({
        coches: concesionario.cochesID
        });
  } catch (error) {
        res.status(500).send(error.message);
        return;
  }
}
