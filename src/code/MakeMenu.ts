import { createEntityList } from './EntityList.js'
import { switchState } from './gameMain.js';

import EditorState from "./States/EditorState"
import PlayState from "./States/PlayState"

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
    
    
    let playButton = document.createElement('button')
    playButton.innerText = 'Play'
    playButton.onclick = ()=>{
        switchState(new PlayState({}))
    }
    menuDiv.append(playButton)

    

    menuDiv.append(createEntityList(state.addEntity.bind(state)))
    let details = document.createElement('div')
    details.id = 'details'
    details.classList.add("p-2", "bg-body","border")
    menuDiv.append(details)


}