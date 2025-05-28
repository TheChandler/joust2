import { State, Vector2 } from "jsgame";
import { createEntityList, entityList } from "../EntityList";
import { Entity } from "../gameEntities/Entity.js";
import { killGame, shapeFactory } from "../gameMain.js";
import { collisionSystem } from "../Systems/PlayState/CollisionSystem.js";

export default class PlayState implements State {

    entities: Entity[] = []

    constructor(dependencies: any) {
        this.loadLevelData();
    }
    name?: string | undefined;
    click(event: Event): void {
        // throw new Error("Method not implemented.");
    }
    mousemove(event: Event): void {
        // throw new Error("Method not implemented.");
    }
    contextmenu(event: Event): void {
        // throw new Error("Method not implemented.");
    }
    update(): void {
        
        collisionSystem.update()
        this.entities.forEach(e => {
            try {
                e.update()
                //@ts-ignore
                if (e.draw) {
                    //@ts-ignore
                    e.draw()
                }
            } catch (err) {
                console.log("Entity failed to update", e, err)
                killGame();
            }
        })
    }

    loadLevelData() {
        let levelData = localStorage.getItem('level')

        // Temp list of entities
        let entities = [];
        if (levelData) {
            entities = JSON.parse(levelData) as Entity[]
        }
        for (let entity of entities) {
            let classType = entityList.find(c => c.name == entity.type)

            if (classType) {
                console.log(entity)
                let payload: any = {
                    name: entity.name,
                    id: entity.id,
                    type: entity.type,
                    image: null,

                }

                if (classType.hasPosition) {
                    payload.position = shapeFactory.createVector2(entity.position[0], entity.position[1]);
                }
                if (classType.hasSize) {
                    payload.size = entity.size
                }

                this.entities.push(new classType(payload))
            } else {
                console.log("not found", entity.type, entityList)
            }
        }
    }
}