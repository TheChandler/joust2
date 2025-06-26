import { Vector2 } from "jsgame";
import { Ball } from "./Ball.js";
import { Entity } from "./Entity.js";

export class ParticleEmitter extends Entity {
    static hasPosition = true;

    private addEntity;
    constructor({ position, addEntity }) {
        super()
        this.position = position
        console.log("Emmitter", position, this)
        this.addEntity = addEntity
    }

    timer = 0;
    update() {
        this.timer++;
        let offset = this.timer%60
        if (true || [0,10,20,30,40,50].includes(offset)) {
            // console.log(this.position)
            for (let i = 0; i < 10; i++) {

                let direction = new Vector2(55 + Math.random()*-30,-25);
                direction.rotate(Math.random()*(Math.PI/2)-(Math.PI/4))

                //@ts-ignore
                this.addEntity(  this.position.x, this.position.y,  direction.x, direction.y, 100)
            }
        }
    }
}