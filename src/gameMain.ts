import { CameraConstructor } from "jsgame";
import { State } from "jsgame";
import { ShapeFactory } from "jsgame";
import  MainState  from "./MainState";
import { createEntityList } from "./EntityList.js";

export const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canv");
// canvas.height = canvas.clientHeight;
// canvas.width = canvas.clientWidth;
console.log("look at this shit")
canvas.height = 1300;
canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
// console.log("Canvas Size:")
// console.log(canvas.width, canvas.height)
const c = <CanvasRenderingContext2D>canvas.getContext("2d")
const ctx = CameraConstructor.MakeGameCamera(c, canvas, 0, 0);
const staticCtx = ctx.baseObj;
const shapeFactory = new ShapeFactory(ctx)
const staticShapeFactory = new ShapeFactory(staticCtx)
interface StateContainer {
    state?: State
    setState: (stateClass: any) => void
}
console.log("Main state", MainState)
let stateContainer: StateContainer = {
    state: null,
    setState: function (stateClass){
        this.state = new stateClass({c, ctx, staticCtx,shapeFactory, staticShapeFactory})
    }
}
setTimeout(()=>{
    console.log("stateContainer.state", stateContainer.setState(MainState))
}, 1000)
canvas.addEventListener('click', (event) => stateContainer.state.click(event))
canvas.addEventListener("mousemove", (event) => stateContainer.state.mousemove(event))
canvas.addEventListener('contextmenu', (event) => stateContainer.state.contextmenu(event))


document.body.append(createEntityList())


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