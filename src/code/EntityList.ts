import { BaseEntity } from './gameEntities/baseEntity.js';
import { TestEntity } from './gameEntities/testEntity.js'

export function createEntityList() {

    let entities = [
        TestEntity
    ]

    let optionsList = []


    console.log("test entity", TestEntity.getOptions())
    for (let entity of entities){
        
        let options = entity.getOptions();
        for (let option of options){
            optionsList.push(option)
        }
    }


    let div = document.createElement("div")
    for (let option of optionsList){
        let child = document.createElement('div')
        child.innerText = `${option.name} ${option.type}`
        div.appendChild(child);
    }

    return div

}