import { Entity } from "../../GameEntities/Entity"



//TODO: Actually use this class
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