import { createEntityList } from './EntityList.js'

import EditorState from "./States/EditorState"

export function makeMenu(state: EditorState) {
    let menuDiv = document.getElementById('mainMenu');

    let saveButton = document.createElement('button')
    saveButton.innerText = 'Save'
    saveButton.onclick = ()=>{
        let levelData = state.getLevelData();
        console.log(levelData)
        let levelDataString = JSON.stringify(levelData)
        localStorage.setItem('level', levelDataString)
    }
    menuDiv.append(saveButton)
    menuDiv.append(createEntityList(state.addEntity.bind(state)))
    let details = document.createElement('div')
    details.id = 'details'
    details.classList.add("p-2", "bg-body","border")
    menuDiv.append(details)


}