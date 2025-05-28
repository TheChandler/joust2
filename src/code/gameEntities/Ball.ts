import { Circle, CreateImage, Sprite, Vector2 } from "jsgame";
import { shapeFactory } from "../gameMain.js";
import { Entity, EntityOption, EntityOptionType } from "./Entity.js";
import { IShape } from "jsgame/build/IShape.js";
import { COLLISION_TYPE } from "../Constants/CollisionTypes.js";




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

    collisionShape: Circle = null;
    isActive: boolean = false;
    velocity: Vector2;
    collisionType: COLLISION_TYPE = COLLISION_TYPE.MOBILE_COLLISION;

    constructor({ name, position, size, id, type, image }) {
        super();
        console.log("Ball",JSON.stringify(this))
        this.name = name;
        this.id = id;
        this.type = type;

        this.size = size[0];
        this.collisionShape = shapeFactory.createCircle(position.x, position.y, (this.size as number)/2);
        this.position = this.collisionShape.position;
        this.velocity = shapeFactory.createVector2(0, 0);

        this.create();
    }

    public update() {
        this.draw()
        this.velocity.y += .5
        this.position.add(this.velocity);

    }
    public draw() {
        this.collisionShape.draw('#f00');
    }

    public collide(entity: Entity) {
        console.log("Collided", entity.type, entity.id)
        this.velocity.y = - 5// Math.abs(Math.sqrt(((this.velocity.y*this.velocity.y) * .85) + (this.position.y - 100)))
    }

}