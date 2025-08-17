import { Entity } from "../../GameEntities/Entity"
import { killGame } from "../../gameMain.js";



//TODO: Actually use this class
export class EntitySystem {

    entities: Entity[];
    constructor(initialEntities) {
        this.entities = initialEntities;
    }
    add(entity: Entity) {
        this.entities.push(entity)
    }

    update(){
        this.entities.forEach(e => {
            try {
                e.update()
                //@ts-ignore
                if (e.draw) {
                    e.draw()
                }
            } catch (err) {
                console.log("Entity failed to update", e, err)
                killGame();
            }
        })
    }
}