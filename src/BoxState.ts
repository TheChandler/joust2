import { State } from "jsgame";
import { shapeFactory, switchState } from "./main";


export default class BoxState implements State {

    square: any;
    constructor(){
        // console.log("shapeFactory", shapeFactory)
        this.square = shapeFactory.makeSquare(0,0,100,100,"red");
        
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
        this.square.draw();
    }

}