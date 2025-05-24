import { CreateImage, Sprite, Vector2 } from "jsgame";
import { EntityWIthPosition } from "./EntityWithPosition.js";
import { shapeFactory } from "../gameMain.js";
import { EntityOption, EntityOptionType } from "./Entity.js";
import { IShape } from "jsgame/build/IShape.js";




//Todo: Fix createimage naming capitalization and filename
let spritePlaceholder = CreateImage('./assets/images/testpng.png')

export class Ball extends EntityWIthPosition{

    static image = CreateImage('./assets/images/ball.png')


    public static options = [
        new EntityOption("name", EntityOptionType.String),
        new EntityOption("position", EntityOptionType.Vector),
        new EntityOption("size", EntityOptionType.Vector)
    ]

    name: string;
    shape: IShape;
    size: number ;
    isActive: boolean = false;
    id: string;
    type: string;

    constructor({ name, position, size, id, type, image }){
            super();
            this.name = name;
            this.id = id;
            this.type = type;
            this.position = position;
            this.size = size;
            
            this.shape = shapeFactory.createCircle(this.position.x, this.position.y, this.size);

    }

    
    public update() {
        this.shape.draw('#f00');
        this.position.y += 10;

    }

    


}