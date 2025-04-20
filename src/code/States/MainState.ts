import { State, Vector2 } from "jsgame";
import { Entity } from "../gameEntities/Entity.js";
import { EditorEntity } from "../gameEntities/EditorEntity.js";

export default class MainState implements State {

    circle: any;
    menu: HTMLElement | null;


    editorEntities: EditorEntity[] = []
    constructor(dependencies: any){
        console.log("dep", dependencies)

        this.editorEntities.push( new EditorEntity({
            name: 'test',
            position: new Vector2(null,0,0),
            size: new Vector2(null, 10,10)
        }) );
        this.menu = document.getElementById("mainMenu")
        
    }
    name =  "MainState";
    click(event: Event){
        for (let entity of this.editorEntities){
            entity.click(event);
        }
    }
    mousemove(event: Event){

    }
    contextmenu(event: Event){

    }
    update(){
        this.render();
    }
    render(){
        for (let entity of this.editorEntities){
            entity.draw();
        }
    }

}