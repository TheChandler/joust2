import { CameraConstructor } from "jsgame";
import { State } from "jsgame";
import { ShapeFactory } from "jsgame";
import  MainState  from "./MainState";

export const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canv");
// canvas.height = canvas.clientHeight;
// canvas.width = canvas.clientWidth;
canvas.height = 1300;
canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
// console.log("Canvas Size:")
// console.log(canvas.width, canvas.height)
export const c = <CanvasRenderingContext2D>canvas.getContext("2d")
export const ctx = CameraConstructor.MakeGameCamera(c, canvas, 0, 0);
export const staticCtx = ctx.baseObj;
export const shapeFactory = new ShapeFactory(ctx)
export const staticShapeFactory = new ShapeFactory(staticCtx)
interface StateContainer {
    state?: State
}
console.log("Main state", MainState)
let stateContainer: StateContainer = {
    state: null
}
setTimeout(()=>{
    stateContainer.state = new MainState()
    console.log("stateContainer.state", stateContainer.state)
}, 1000)
canvas.addEventListener('click', (event) => stateContainer.state.click(event))
canvas.addEventListener("mousemove", (event) => stateContainer.state.mousemove(event))
canvas.addEventListener('contextmenu', (event) => stateContainer.state.contextmenu(event))

export const FRAMERATE =  60; 

let tickLength = 1000 / FRAMERATE;
let nextTickTime = 0;
function update() {
    while (performance.now() > nextTickTime) {
        if ((performance.now() - nextTickTime) > (tickLength * 10)) {
            nextTickTime = performance.now() + tickLength
        } else {
            nextTickTime += tickLength
        }
        
        ctx.fillStyle = "#fff"
        ctx.fillRect(ctx.position.x - (ctx.size.x / 2), ctx.position.y - (ctx.size.y / 2), canvas.width, canvas.height)
        if (stateContainer.state) {
            stateContainer.state.update();
        }
    }
    requestAnimationFrame(update)
}

export function switchState(state: State) {
    stateContainer.state = state;
}

update();