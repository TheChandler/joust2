import { CameraConstructor, State } from "jsgame";
import { ShapeFactory } from "jsgame";
import { createEntityList } from "./EntityList.js";
import { StateManager } from "./StateManager.js";

export const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canv");
// canvas.height = canvas.clientHeight;
// canvas.width = canvas.clientWidth;

canvas.height = 400;
canvas.width = 600;

const c = <CanvasRenderingContext2D>canvas.getContext("2d")
const ctx = CameraConstructor.MakeGameCamera(c, canvas, 0, 0);
const staticCtx = ctx.baseObj;
const shapeFactory = new ShapeFactory(ctx)
const staticShapeFactory = new ShapeFactory(staticCtx)

let stateContainer = new StateManager({c, ctx, staticCtx,shapeFactory, staticShapeFactory});



canvas.addEventListener('click', (event) => stateContainer.state.click(event))
canvas.addEventListener("mousemove", (event) => stateContainer.state.mousemove(event))
canvas.addEventListener('contextmenu', (event) => stateContainer.state.contextmenu(event))


document.getElementById('mainMenu').append(createEntityList())


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