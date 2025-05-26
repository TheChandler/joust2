import { Circle, CreateImage, Sprite, Vector2 } from "jsgame";
import { shapeFactory } from "../gameMain.js";
import { Entity, EntityOption, EntityOptionType } from "./Entity.js";
import { IShape } from "jsgame/build/IShape.js";




//Todo: Fix createimage naming capitalization and filename
let spritePlaceholder = CreateImage('./assets/images/testpng.png')

export class Ball extends Entity {

    static image = CreateImage('./assets/images/ball.png')
    static hasPosition: boolean = true;
    static hasSize: boolean = true;


    public static options = [
        new EntityOption("name", EntityOptionType.String),
        new EntityOption("position", EntityOptionType.Vector),
        new EntityOption("size", EntityOptionType.Vector)
    ]

    shape: Circle;
    isActive: boolean = false;
    velocity: Vector2;


    constructor({ name, position, size, id, type, image }) {
        super();
        this.name = name;
        this.id = id;
        this.type = type;

        this.size = size[0];
        this.shape = shapeFactory.createCircle(position.x, position.y, this.size as number);
        this.position = this.shape.position;
        this.velocity = shapeFactory.createVector2(0, 0);

    }


    public update() {
        this.draw()
        if (this.position.y > 100){
            this.velocity.y = - Math.abs(Math.sqrt(((this.velocity.y*this.velocity.y) * .85) + (this.position.y - 100)))
        }
        this.velocity.y += .5
        this.position.add(this.velocity);

    }
    public draw() {
        this.shape.draw('#f00');
    }

}