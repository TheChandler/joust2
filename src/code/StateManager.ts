import { State } from 'jsgame'


export class StateManager {
    deps: any;
    state: State
    constructor(deps) {
        this.deps = deps;
        this.deps.stateContainer = this;
    }

    setState(stateClass) {
        this.state = new stateClass(this.deps)
    }

}