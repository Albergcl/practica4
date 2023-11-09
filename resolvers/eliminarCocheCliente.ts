import { Request, Response } from "npm:express@4.18.2";
import { cocheDB, clienteDB } from "../db/DBs.ts";

export const eliminarCocheCliente = async(req: Request, res: Response) => {
  try {
        const { clienteId, cocheId } = req.body;

        const cliente = await clienteDB.findById(clienteId);
        const coche = await cocheDB.findById(cocheId);

        if (!cliente || !coche) {
            res.status(404).send("Coche o Cliente not found");
            return;
        }

        cliente.coches = cliente.coches.filter((coche) => coche.toString() !== cocheId);
        await cliente.save();

        coche.propietario = "Sin propietario";
        await coche.save();

        res.status(200).send("Coche eliminado con exito");
  } catch (error) {
        res.status(500).send(error.message);
        return;
  }
}
