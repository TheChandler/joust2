import { CreateImage, DrawableSprite, Sprite, Vector2 } from "jsgame";
import { shapeFactory } from "../gameMain.js";
import { Entity } from "./Entity.js";
import { COLLISION_TYPE } from "../Constants/CollisionTypes.js";


export class Platform extends Entity {

    static hasSize: boolean = true;
    static hasPosition: boolean = true;

    sprite: DrawableSprite;
    collisionType: COLLISION_TYPE= COLLISION_TYPE.STATIC_COLLISION;

    static image = CreateImage('./assets/images/testPlatform.png')
    public constructor({ image, position, size }) {
        super()

        let spriteImage = CreateImage('./assets/images/testPlatform.png')

        this.position = position;
        this.size = shapeFactory.createVector2(size[0], size[1]);

        console.log("p,s", position, this.size)
        this.sprite = shapeFactory.createSprite(spriteImage, position.x, position.y, this.size.x, this.size.y)
        this.collisionShape = this.sprite
        this.create()
    }

    public update() {
    }

    public draw() {
        this.sprite.draw()
    }
    public collide(entity: Entity) {
        // No interaction
    }

}