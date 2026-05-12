/*
    MÓDULO: DATOS
    - ¿Qué es una base de datos?: Es la fuente de la verdad de la aplicación, donde reside la información que se va a consumir.
    - ¿Qué hace este módulo?: Simula una base de datos exportando un arreglo estático con toda la información de los cohetes.
*/
export const cohetes = [
    {
        id: 1,
        nombre: "Falcon 9",
        operador: "SpaceX",
        metrosAltura: 70,
        etapas: 2,
        toneladasCarga: 17.5,
        reutilizacion: "parcial"
    },
    {
        id: 2,
        nombre: "Falcon Heavy",
        operador: "SpaceX",
        metrosAltura: 70,
        etapas: 2,
        toneladasCarga: 57,
        reutilizacion: "parcial"
    },
    {
        id: 3,
        nombre: "Starship",
        operador: "SpaceX",
        metrosAltura: 124,
        etapas: 2,
        toneladasCarga: 100,
        reutilizacion: "total"
    },
    {
        id: 4,
        nombre: "New Glenn",
        operador: "Blue Origin",
        metrosAltura: 98,
        etapas: 2,
        toneladasCarga: 45,
        reutilizacion: "parcial"
    },
    {
        id: 5,
        nombre: "SLS",
        operador: "NASA",
        metrosAltura: 98,
        etapas: 2,
        toneladasCarga: 95,
        reutilizacion: "nula"
    }
]