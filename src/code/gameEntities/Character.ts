import { CreateImage, DrawableSprite, Sprite, Vector2 } from "jsgame";
import { Entity } from "./Entity.js";
import { shapeFactory } from "../gameMain.js";
import { validateLocaleAndSetLanguage } from "typescript";


interface Input {
    left: boolean;
    right: boolean;
    jump: boolean;
}

export class Character extends Entity {


    static hasPosition = true;
    static hasSize = true;
    static image = CreateImage('./assets/images/flamingo.png')

    sprite: DrawableSprite;

    velocity: Vector2;
    constructor({ position, velocity }) {
        super()
        this.position = position
        this.sprite = shapeFactory.createSprite(Character.image, this.position.x, this.position.y, 40, 40)
        if (velocity) {
            this.velocity = velocity
        } else {
            this.velocity = new Vector2(0, 0)
        }
    }
    public update() {
        this.position = this.position.add(this.velocity)
    }
    public draw() {
        this.sprite.draw()
    }

    public handleInput(input: Input) {
        if (input.left) {
            this.velocity.x += -10
        }
        if (input.right){
            this.velocity.x += 10;
        }
        if (input.jump){
            this.velocity.y += - 40
        }
    }
}