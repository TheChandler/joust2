import { CameraConstructor, Input, State } from "jsgame";
import { ShapeFactory } from "jsgame";
import { createEntityList } from "./EntityList.js";
import { StateManager } from "./StateManager.js";
import MainState from "./States/MainState.js";

export const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canv");
// canvas.height = canvas.clientHeight;
// canvas.width = canvas.clientWidth;

canvas.height = 640;
canvas.width = 1137;

export const c = <CanvasRenderingContext2D>canvas.getContext("2d", {alpha: false})
export const ctx = CameraConstructor.MakeGameCamera(c, canvas, 0, 0);
ctx.imageSmoothingEnabled = false;
export const staticCtx = ctx.baseObj;
export const shapeFactory = new ShapeFactory(ctx)
export const staticShapeFactory = new ShapeFactory(staticCtx)

let stateContainer = new StateManager({c, ctx, staticCtx,shapeFactory, staticShapeFactory});
stateContainer.setState(MainState)

canvas.addEventListener('click', (event) => stateContainer.state.click(event))
canvas.addEventListener("mousemove", (event) => stateContainer.state.mousemove(event))
canvas.addEventListener('contextmenu', (event) => stateContainer.state.contextmenu(event))


export const input = new Input();
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
        
        ctx.fillStyle = "#ddd"
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