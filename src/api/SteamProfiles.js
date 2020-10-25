
export const Pieter = "76561198137873527";
export const Jildert = "76561198042254620";
export const Ilse = "76561198401434810";
export const Rianne = "76561198798100412";


const IdMap = {
    "": Pieter,
    "pieter": Pieter,
    "ilse": Ilse,
    "jildert": Jildert,
    'rianne': Rianne,
}

// url parameter name id naar een echte id, als het kan, anders gewoon de id
export default (id) => {
    id = id || "";
    return IdMap[id] || id
}

