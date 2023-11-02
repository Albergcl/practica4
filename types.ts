export enum COCHETYPE {
  todoterreno = "todoterreno",
  suv = "suv",
  berlina = "berlina",
  monovolumen = "monovolumen"
}

export enum MOTORTYPE {
    diesel = "diesel",
    gasolina = "gasolina",
    electrico = "electrico"
}

export type Coche = {
    precio: number,
    tipo: COCHETYPE,
    tipoMotor: MOTORTYPE,
    marca: string,
    matricula: string,
    propietario: Cliente
    id: string
}

export type Concesionario = {
    coches: Coche[],
    clientes: Cliente[],
    id: string
}

export type Cliente = {
    dinero: number,
    dni: string,
    nombre: string
    id: string
}