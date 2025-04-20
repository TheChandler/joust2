
import { EditorEntity } from './gameEntities/EditorEntity.js'

export function createEntityList() {

    let entities = [
        EditorEntity
    ]

    let optionsList = []


    console.log("test entity", EditorEntity.getOptions())
    
    let div = document.createElement("div")
    for (let entity of entities){
        let child = document.createElement('div')
        child.innerText = entity.name
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