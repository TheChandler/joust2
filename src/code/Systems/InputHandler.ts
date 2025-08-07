export class InputHandler {
    pressEvents: (() => void)[];
    releaseEvents: (() => void)[];

    currentlyDownKeys: { [key: string]: boolean } = {};
    constructor() {
        this.currentlyDownKeys = {}
        console.log("cdk", this.currentlyDownKeys)
    }
    get(keyName) {
        //To avoid returning null        
        return this.currentlyDownKeys[keyName] == true
    }
    DEBUG = true;
    keyDown(event: KeyboardEvent) {
        console.log('keydown')

        console.log("cdk", this)
        if (this.DEBUG) {
            console.log(event.code)
        }
        this.currentlyDownKeys[event.code] = true;
    }
    keyUp(event) {
        this.currentlyDownKeys[event.code] = false;
    }
}