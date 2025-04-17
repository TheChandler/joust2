import { State } from "jsgame";

export default class MainState implements State {

    circle: any;
    menu: HTMLElement | null;
    constructor(dependencies: any){
        console.log("dep", dependencies)

        this.circle = dependencies.shapeFactory.createCircle(0,0,100,"red");
        this.menu = document.getElementById("mainMenu")
        
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