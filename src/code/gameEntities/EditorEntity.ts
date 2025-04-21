import { IShape, Shape } from "jsgame/build/IShape.js";
import { ctx, shapeFactory } from "../gameMain.js";
import { Entity, EntityOption, EntityOptionType } from "./Entity.js";
import { Circle, Sprite, Vector2, CreateImage } from 'jsgame'
import { EntityWIthPosition } from "./EntityWithPosition.js";


//Todo: Fix createimage naming capitalization and filename
let spritePlaceholder = CreateImage('./assets/images/testpng.png')

export class EditorEntity extends EntityWIthPosition {

    public static options = [
        new EntityOption("name", EntityOptionType.String),
        new EntityOption("position", EntityOptionType.Vector),
        new EntityOption("size", EntityOptionType.Vector)
    ]

    name: string;
    shape: Sprite;
    size: Vector2;
    constructor({ name, position, size }) {
        super();
        this.name = name;
        this.position = position;
        this.size = size;
        this.shape = shapeFactory.createSprite(spritePlaceholder, position.x, position.y, size.x, size.y)
    }
    public update(){
        this.shape.draw('#f00');
    }
    

    public draw(){
        // TODO: update sprite class to use vector2 as position and size. This will allow sharing of values more directly


        this.shape.x = this.position.x;
        this.shape.y = this.position.y;
        this.shape.width = this.size.x;
        this.shape.height = this.size.y;

        this.shape.draw();
        console.log('rerender')
    }
    public click(event){
        let [x,y] = ctx.convertScreenCordsToWorldCords(event.clientX, event.clientY)
        if ( this.shape.collides(new Vector2(null, x, y))){
            Math.random() > .5 ?
                this.position.x += 10 :
                this.position.x -= 10 ;
        }


    }
    
}