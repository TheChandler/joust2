import { State } from "jsgame";
import { shapeFactory, switchState } from "./main";


export default class MainState implements State {

    circle: any;
    constructor(dependencies: any){
        console.log("dep", dependencies)

        this.circle = dependencies.shapeFactory.createCircle(0,0,100,"red");
        
    }
    name =  "MainState";
    click(event: Event){
        
    }
    mousemove(event: Event){

    }
    contextmenu(event: Event){

    }
    update(){
        this.render();
    }
    render(){
        this.circle.draw();
    }

}