import { State, Vector2 } from "jsgame";
import { createEntityList, entityList } from "../EntityList";
import { Entity } from "../GameEntities/Entity";
import { killGame, shapeFactory } from "../gameMain";
import { collisionSystem } from "../Systems/PlayState/CollisionSystem";
import { ParticleSystem } from '../Systems/PlayState/ParticleSystem'
import { EntitySystem } from '../Systems/PlayState/EntitySystem'

export default class PlayState implements State {

    entitySystem: EntitySystem = new EntitySystem([]);
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

        this.entitySystem.update();

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
                    particleSystem: this.particleSystem,
                    entitySystem: this.entitySystem,

                }

                if (classType.hasPosition) {
                    payload.position = shapeFactory.createVector2(entity.position[0], entity.position[1]);
                }
                if (classType.hasSize) {
                    payload.size = entity.size
                }
                let newEntity = new classType(payload)

                this.entitySystem.add(newEntity)
            } else {
                console.log("not found", entity.type, entityList)
            }
        }
    }
}