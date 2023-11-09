import { Request, Response } from "npm:express@4.18.2";
import { cocheDB, clienteDB } from "../db/DBs.ts";

export const venderCoche = async(req: Request, res: Response) => {
    try {
        const { cocheId, clienteId } = req.body;
    
        const coche = await cocheDB.findById(cocheId);
        const cliente = await clienteDB.findById(clienteId);
    
        if(!coche || !cliente){
            res.status(404).send("Cliente o Coche not found");
        }

        

        if (cliente?.dinero && coche?.precio && cliente.dinero > coche.precio){
            cliente.dinero -= coche.precio;
            cliente.coches.push(coche._id);
            await cliente.save();

            coche.propietario = cliente._id;
            await coche.save();
            res.status(200).send("Coche vendido con exito");
        } else{
            res.status(400).send("El cliente no tiene suficiente dinero para comprar el coche");
        }   
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
}