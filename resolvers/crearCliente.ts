import { Request, Response } from "npm:express@4.18.2";
import { clienteDB } from "../db/DBs.ts";

export const crearCliente = async(req: Request, res: Response) => {
    try {
        const { dinero, dni, nombre } = req.body;
    
        const clienteExistente = await clienteDB.findOne({ dni });
    
        if (clienteExistente) {
          res.status(400).send("Ya existe un cliente con ese DNI");
        }
    
        const newCliente = new clienteDB({
          dinero,
          dni,
          nombre,
        });
    
        await newCliente.save();
    
        res.status(200).send({
          dinero: newCliente.dinero,
          dni: newCliente.dni,
          nombre: newCliente.nombre
        })
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
  }