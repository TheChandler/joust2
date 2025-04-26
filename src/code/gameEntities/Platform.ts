import { CreateImage, Sprite, Vector2 } from "jsgame";
import { EntityWIthPosition } from "./EntityWithPosition.js";
import { shapeFactory } from "../gameMain.js";



export class Platform extends EntityWIthPosition{

    image: HTMLImageElement;
    size: Vector2;

    sprite: Sprite;
    public constructor({image, position, size}){
        super()

        this.image= CreateImage('./assets/images/testPlatform.png');
        this.position=position;
        this.size=size;

        this.sprite = shapeFactory.createSprite(image, position.x, position.y, size.x, size.y)
    }

    public update() {
        throw new Error("Method not implemented.");
    }

    public draw(){
        this.sprite.draw()
    }
    
}