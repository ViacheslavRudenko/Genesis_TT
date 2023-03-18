import { createContext } from "react";

const Context = createContext<ContextType>({ addErr: (error: string) => { } })


type ContextType = {
    addErr: (error: string) => void
}

export default Context