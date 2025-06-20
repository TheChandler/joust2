import { State, Vector2 } from "jsgame";
import { createEntityList, entityList } from "../EntityList";
import { Entity } from "../GameEntities/Entity";
import { killGame, shapeFactory } from "../gameMain";
import { collisionSystem } from "../Systems/PlayState/CollisionSystem";
import { ParticleSystem } from '../Systems/PlayState/ParticleSystem'

export default class PlayState implements State {

    entities: Entity[] = []
    particleSystem = new ParticleSystem();

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
        // console.log("length", this.entities.length)
        collisionSystem.update()
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


        this.particleSystem.update()
        this.particleSystem.draw()
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
                payload.addEntity = (x, y, xvel, yvel, lt) => { this.particleSystem.add(x, y, xvel, yvel, lt) };
                let newEntity = new classType(payload)

                this.entities.push(newEntity)
            } else {
                console.log("not found", entity.type, entityList)
            }
        }
    }
}