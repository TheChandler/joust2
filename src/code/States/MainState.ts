import { State, Vector2 } from "jsgame";
import { Entity } from "../gameEntities/Entity.js";
import { EditorEntity } from "../gameEntities/EditorEntity.js";
import { ctx, input } from "../gameMain.js";

export default class MainState implements State {

    circle: any;
    menu: HTMLElement | null;

    editorEntities: EditorEntity[] = []
    selectedEntity: EditorEntity;

    constructor(dependencies: any) {
        console.log("dep", dependencies)

        this.editorEntities.push(new EditorEntity({
            name: 'test',
            position: new Vector2(null, 0, 0),
            size: new Vector2(null, 100, 100)
        }));
        this.menu = document.getElementById("mainMenu")


        console.log(this.editorEntities)
        document.addEventListener('pointerdown', this.pointerDown.bind(this))

    }
    name = "MainState";
    click(event: Event) {

    }

    pointerDown(event: MouseEvent) {
        let [x, y] = ctx.convertScreenCordsToWorldCords(event.clientX, event.clientY)
        let vec = new Vector2(null, x, y)
        console.log("FIRE FIRE FIRE", this.editorEntities)
        for (let entity of this.editorEntities) {
            console.log("Clicking?")
            if (entity.click(vec)) {
                this.selectedEntity = entity;
                entity.selectForMovement(vec)
                break;
            }
            this.selectedEntity = null
        }
    }

    mousemove(event: MouseEvent) {
        console.log(input)
        if (this.selectedEntity && input.keys['mouseleft']) {
            let vec = new Vector2(null, event.movementX, event.movementY);
            this.selectedEntity.move(vec)
        }
    }
    contextmenu(event: Event) {

    }
    update() {
        this.render();
    }
    render() {
        for (let entity of this.editorEntities) {
            entity.draw();
        }
    }

}