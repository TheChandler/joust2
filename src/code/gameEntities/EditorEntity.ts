import { IShape, Shape } from "jsgame/build/IShape.js";
import { ctx, shapeFactory } from "../gameMain.js";
import { Entity, EntityOption, EntityOptionType } from "./Entity.js";
import { Circle, Vector2 } from 'jsgame'
import { EntityWIthPosition } from "./EntityWithPosition.js";


export class EditorEntity extends EntityWIthPosition {

    public static options = [
        new EntityOption("name", EntityOptionType.String),
        new EntityOption("position", EntityOptionType.Vector),
        new EntityOption("size", EntityOptionType.Vector)
    ]

    name: string;
    shape: Circle;
    size: Vector2;
    constructor({ name, position, size }) {
        super();
        this.name = name;
        this.position = position;
        this.shape = shapeFactory.createCircle(position.x, position.y, 10)
        this.shape.position = this.position
    }
    public update(){
        this.shape.draw('#f00');
    }
    public draw(){
        this.shape.draw('#f00');
        console.log('rerender')
    }
    public click(event){
        
        let [x,y] = ctx.convertScreenCordsToWorldCords(event.clientX, event.clientY)
        this.position.x = x
        this.position.y = y
    }
    
}