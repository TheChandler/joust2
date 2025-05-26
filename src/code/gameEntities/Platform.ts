import { CreateImage, Sprite, Vector2 } from "jsgame";
import { shapeFactory } from "../gameMain.js";
import { Entity } from "./Entity.js";


export class Platform extends Entity {

    static hasSize: boolean = true;
    static hasPosition: boolean = true;

    sprite: Sprite;

    static image = CreateImage('./assets/images/testPlatform.png')
    public constructor({ image, position, size }) {
        super()

        let spriteImage = CreateImage('./assets/images/testPlatform.png')

        this.position = position;
        this.size = shapeFactory.createVector2(size[0], size[1]);

        console.log("p,s", position, this.size)
        this.sprite = shapeFactory.createSprite(spriteImage, position.x, position.y, this.size.x, this.size.y)
    }

    public update() {
    }

    public draw() {
        this.sprite.draw()
    }

}