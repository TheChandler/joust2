import { State } from "jsgame";

export interface StateContainer {
    state?: State
    setState: (stateClass: any) => void
}
