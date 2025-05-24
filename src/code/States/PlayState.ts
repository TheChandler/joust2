import { State, Vector2 } from "jsgame";
import { createEntityList, entityList } from "../EntityList.js";
import { Entity } from "../gameEntities/Entity.js";



export class PlayState implements State {

    entities: Entity[]

    constructor(dependencies: any){
        this.loadLevelData();
    }
    name?: string | undefined;
    click(event: Event): void {
        throw new Error("Method not implemented.");
    }
    mousemove(event: Event): void {
        throw new Error("Method not implemented.");
    }
    contextmenu(event: Event): void {
        throw new Error("Method not implemented.");
    }
    update(): void {
        throw new Error("Method not implemented.");
    }

    loadLevelData() {
        let levelData = localStorage.getItem('level')
        let entities: any[] = [];
        if (levelData){
            entities = JSON.parse(levelData)
        }
        for (let entity of entities) {
            let classType = entityList.find(c => c.name == entity.type)
            
            

            if (classType){

                this.entities.push(new classType({
                    image:null,
                    position: new Vector2(null, entity.position[0], entity.position[1]),
                    size: new Vector2(null, entity.size[0], entity.size[1])
                }))
            } else{
                console.log("not found", entity.type, entityList)
            }
        }
    }
}