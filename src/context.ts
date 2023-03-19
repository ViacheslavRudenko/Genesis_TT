import { createContext } from "react";
import { ErrorForAlertTypes } from './types/context'

const Context = createContext<ContextType>({
    addErr: (error: ErrorForAlertTypes) => { }
})


export type ContextType = {
    addErr: (error: ErrorForAlertTypes) => void
}

export default Context