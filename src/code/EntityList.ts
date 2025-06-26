
import { Ball } from './GameEntities/Ball.js'
import { Character } from './GameEntities/Character.js'
import { EditorEntity } from './GameEntities/EditorEntity.js'
import { ParticleEmitter } from './GameEntities/ParticleEmitter.js'
import { Platform } from './GameEntities/Platform.js'


export const entityList = [
    Platform,
    Ball,
    ParticleEmitter,
    Character,
]

export function createEntityList(create) {

    let div = document.createElement("div")
    div.classList.add('p-3', 'bg-body-secondary')
    for (let entity of entityList) {
        let child = document.createElement('div')
        child.innerText = entity.name
        child.onclick = () => create(entity)
        div.appendChild(child);
    }

    // for (let entity of entities){

    //     let options = entity.getOptions();
    //     for (let option of options){
    //         optionsList.push(option)
    //     }
    // }


    // let div = document.createElement("div")
    // console.log(optionsList)
    // for (let option of optionsList){
    //     let child = document.createElement('div')
    //     child.innerText = `${option.name} ${option.type}`
    //     div.appendChild(child);
    // }

    return div

}