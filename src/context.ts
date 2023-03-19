import { createContext, Dispatch } from "react";
import { ErrorForAlertTypes } from './types/context'
import { LessonTypes } from "./types/course";

const Context = createContext<ContextType>({
    addErr: () => { },
    setPlayerData: () => { },
    isPlayerOpen: false,
    setIsPlayerOpen: () => { },
    playerData: undefined
})


export type ContextType = {
    addErr: (error: ErrorForAlertTypes) => void,
    setPlayerData: Dispatch<React.SetStateAction<LessonTypes | undefined>>
    isPlayerOpen: boolean
    setIsPlayerOpen: Dispatch<React.SetStateAction<boolean>>
    playerData: LessonTypes | undefined
}

export default Context