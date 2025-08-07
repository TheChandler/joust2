import { Sprite } from "jsgame";
import { COLLISION_TYPE } from "../../Constants/CollisionTypes.js";
import { Entity } from "../../GameEntities/Entity.js";
import { killGame } from "../../gameMain.js";


export class CollisionSystem {
    entities: Entity[];
    constructor(initialEntities: Entity[] = []) {
        this.entities = initialEntities;
    }

    update() {
        this.entities.forEach(entity => {
            if (entity.collisionType == COLLISION_TYPE.MOBILE_COLLISION) {
                this.entities.forEach(entity2 => {
                    try{

                        if (entity2.id !== entity.id && entity.collisionShape.collides(entity2.collisionShape)) {
                            console.log(entity, entity2)
                            entity.collide(entity2);
                        }
                    }catch(e){
                        console.log(entity.collisionShape instanceof Sprite, entity2.collisionShape instanceof Sprite)
                        console.error(e)
                        killGame()
                    }
                })
            }
        })
    }

    add(entity: Entity) {
        this.entities.push(entity)
    }
    remove(entity: Entity) {
        this.entities = this.entities.filter(e => e.id !== entity.id)
    }
}


export const collisionSystem = new CollisionSystem();

