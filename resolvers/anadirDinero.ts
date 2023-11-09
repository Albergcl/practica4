import { Request, Response } from "npm:express@4.18.2";
import { clienteDB } from "../db/DBs.ts";

export const anadirDinero = async(req: Request, res: Response) => {
    try {
        const { clienteId, cantidad } = req.body;
    
        const cliente = await clienteDB.findById(clienteId);
    
        if (!cliente) {
            res.status(404).send("Cliente not found");
            return;
        }
    
        cliente.dinero += cantidad;
        await cliente.save();
    
        res.status(200).send("Dinero anadido con exito");
    }catch (error){
        res.status(500).send(error.message);
        return;
    }
}