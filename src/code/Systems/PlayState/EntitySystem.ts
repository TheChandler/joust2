import { Entity } from "../../GameEntities/Entity"

export class EntitySystem {

    entities: Entity[];
    constructor(initialEntities) {
        this.entities = initialEntities;
    }

    update(){
        this.entities.forEach(entity =>{
            entity.update();
        })
    }
}