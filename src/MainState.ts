import { State } from "jsgame";
import { shapeFactory, switchState } from "./main";


export default class MainState implements State {

    // square: any;
    constructor(){
        // console.log("shapeFactory", shapeFactory)
        // this.square = shapeFactory.makeSquare(0,0,100,100,"red");
        setTimeout(()=>{
            //Switch to different state
            switchState(this)
        })
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
        // this.square.draw();
    }

}