
import { EditorEntity } from './gameEntities/EditorEntity.js'
import { Platform } from './gameEntities/Platform.js'


export const entityList = [
    Platform
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