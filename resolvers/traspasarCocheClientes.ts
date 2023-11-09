import { Request, Response } from "npm:express@4.18.2";
import { cocheDB, clienteDB } from "../db/DBs.ts";

export const traspasarCocheClientes = async(req: Request, res: Response) => {
    try {
      const { cocheId, clienteOrigenId, clienteDestinoId } = req.body;
  
      const coche = await cocheDB.findById(cocheId);
      const clienteOrigen = await clienteDB.findById(clienteOrigenId);
      const clienteDestino = await clienteDB.findById(clienteDestinoId);
  
      if (!coche || !clienteOrigen || !clienteDestino) {
            res.status(404).send("Coche o algun Cliente not found");
            return;
      }
  
      if (coche.propietario.toString() !== clienteOrigen._id.toString()) {
            res.status(404).send("El coche no pertenece al cliente de origen");
            return;
      }
  
      coche.propietario = clienteDestino._id;
      await coche.save();
  
      res.status(200).send("Coche traspasado con exito");
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
  }