import { Request, Response } from "npm:express@4.18.2";
import { cocheDB, clienteDB, concesionarioDB } from "../db/DBs.ts";

export const crearConcesionario =  async(req: Request, res: Response) => {
    try{
        const { cochesID, clientesID } = req.body;

        const promesasCoches = cochesID.map((id: string) => cocheDB.findById(id));
        const promesasClientes = clientesID.map((id: string) => clienteDB.findById(id));

        const cochesExistentes = await Promise.all(promesasCoches);
        const clientesExistentes = await Promise.all(promesasClientes);

        if(cochesExistentes.some((c: string) => !c) || clientesExistentes.some((c: string) => !c)){
            res.status(404).send("Cliente o Coche not found");
            return;
        }

        const newConcesionario = new concesionarioDB({
            coches: cochesID,
            clientes: clientesID
        });
        await newConcesionario.save();

        res.status(200).send({
            cochesID: newConcesionario.cochesID,
            clientesID: newConcesionario.clientesID
        });
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
}