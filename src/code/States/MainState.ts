import { State, Vector2 } from "jsgame";
import { Entity } from "../gameEntities/Entity.js";
import { EditorEntity } from "../gameEntities/EditorEntity.js";
import { ctx, input } from "../gameMain.js";
import { createEntityList } from "../EntityList.js";
import { makeMenu } from "../MakeMenu"

export default class MainState implements State {

    circle: any;
    menu: HTMLElement | null;

    editorEntities: EditorEntity[] = []
    selectedEntity: EditorEntity;

    constructor(dependencies: any) {
        console.log("dep", dependencies)

        this.loadLevelData();

        this.menu = document.getElementById("mainMenu")


        console.log(this.editorEntities)
        document.addEventListener('pointerdown', this.pointerDown.bind(this))

        makeMenu(this)
    }



    loadLevelData() {
        let levelData = localStorage.getItem('level')
        let entities = JSON.parse(levelData)
        for (let entity of entities) {
            this.editorEntities.push(new EditorEntity({
                name: entity.name,
                id: entity.id,
                type: entity.type,
                position: new Vector2(null, entity.position[0], entity.position[1]),
                size: new Vector2(null, entity.size[0], entity.size[1])
            }))
        }
    }
    getLevelData() {
        let levelData = []
        for (let entity of this.editorEntities) {
            levelData.push({
                name: entity.name,
                position: [entity.position.x, entity.position.y],
                size: [entity.size.x, entity.size.y]
            })
        }
        return levelData
    }

    addEntity(entityType) {
        this.editorEntities.push(new EditorEntity({
            name: entityType.name,
            id: Math.floor(Math.random()*0xFFFFFFFF).toString(16),
            type: entityType.name,
            position: new Vector2(null, 0, 0),
            size: new Vector2(null, 40, 40)
        }))

    }


    name = "MainState";
    click(event: Event) {


    }

    getEntityAt(vec){
        return this.editorEntities.find((e) => e.isAtLocation(vec))
    }

    pointerDown(event: MouseEvent) {
        console.log(this.editorEntities)
        let [x, y] = ctx.convertScreenCordsToWorldCords(event.clientX, event.clientY)
        let vec = new Vector2(null, x, y)
        let selectedEntity = this.getEntityAt(vec)
        if (selectedEntity) {
            this.selectedEntity = selectedEntity;
            selectedEntity.selectForMovement(vec)
            this.updateDetails(selectedEntity)
        }

    }

    updateDetails(entity){
        let div = document.getElementById('details')
        div.innerHTML = ''

        for (let entry of Object.entries(entity)){
            let el = document.createElement('div')
            el.innerText = entry.toString()
            div.append(el);
        }
        
    }

    mousemove(event: MouseEvent) {
        if (this.selectedEntity && input.keys['mouseleft']) {
            let vec = new Vector2(null, event.movementX, event.movementY);
            this.selectedEntity.move(vec)
        }
    }
    contextmenu(event: MouseEvent) {
        event.preventDefault()
        let [x, y] = ctx.convertScreenCordsToWorldCords(event.clientX, event.clientY)
        let vec = new Vector2(null, x, y)
        let selectedEntity = this.getEntityAt(vec);
        this.editorEntities = this.editorEntities.filter(e=> e.id != selectedEntity.id)
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