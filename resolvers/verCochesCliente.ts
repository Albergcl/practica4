import { Request, Response } from "npm:express@4.18.2";
import { cocheDB, clienteDB } from "../db/DBs.ts";

export const verCochesCliente = async(req: Request, res: Response) => {
    try{
        const { clienteID } = req.params;

        const cliente = await clienteDB.findById(clienteID);

        if(!cliente){
            res.status(404).send("Cliente not found");
        }

        const coches = await cocheDB.find({ propietario: cliente?._id});

        res.status(200).send({
            coches: coches
        });
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
}