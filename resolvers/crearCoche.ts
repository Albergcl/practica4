import { Request, Response } from "npm:express@4.18.2";
import { cocheDB, clienteDB } from "../db/DBs.ts";

export const crearCoche = async(req: Request, res: Response) => {
    try{
        const { precio, tipo, tipoMotor, marca, matricula, propietarioID } = req.body;

        const propietario = await clienteDB.findById(propietarioID);
        if(!propietario){
            res.status(404).send("Cliente not found");
        }

        const newCoche = new cocheDB({
            precio,
            tipo,
            tipoMotor,
            marca,
            matricula,
            propietario: propietario?._id
        });

        await newCoche.save();
        propietario?.coches.push(newCoche._id);
        await propietario?.save();

        res.status(200).send({
            precio: newCoche.precio,
            tipo: newCoche.tipo,
            tipoMotor: newCoche.tipoMotor,
            marca: newCoche.marca,
            matricula: newCoche.matricula,
            propietarioId: newCoche.propietario
        });
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
}