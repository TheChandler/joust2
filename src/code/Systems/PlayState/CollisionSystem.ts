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
                    if (entity2.id !== entity.id && entity.collisionShape.collides(entity2.collisionShape)) {
                        entity.collide(entity2);
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

