import { Circle, CreateImage, DrawableCircle, DrawableSprite, Sprite, Vector2 } from "jsgame";
import { killGame, shapeFactory } from "../gameMain.js";
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

    collisionShape: DrawableCircle = null;
    isActive: boolean = false;
    velocity: Vector2;
    collisionType: COLLISION_TYPE = COLLISION_TYPE.MOBILE_COLLISION;

    sprite: DrawableSprite;

    //Remember when passed from saved state these will not have class functions. AKA size.x will not work since size is a length-2 array
    constructor({ name, position, size, id, type, image, velocity }) {
        super();
        // console.log("Ball", JSON.stringify(this))
        this.name = name;
        this.id = id;
        this.type = type;

        this.size = new Vector2(size[0], size[1]);
        this.collisionShape = shapeFactory.createCircle(position.x, position.y, this.size.x / 2);
        this.position = this.collisionShape.position;
        this.velocity = shapeFactory.createVector2(Math.random() - .5, 0);
        if (velocity) {
            this.velocity.x = velocity[0]
            this.velocity.y = velocity[1]
        }

        this.sprite = shapeFactory.createSprite(Ball.image, this.position.x - (this.size.x / 2), this.position.y - (this.size.x / 2), this.size.x, this.size.x)

        // console.log("Created ball", position)
        this.create();
    }

    public update() {
        // console.log("updating", this.name)
        // this.velocity.y += 1.5
        // this.position.add(this.velocity);
        let length1 = Math.sqrt((this.position.x * this.position.x) +(this.position.y * this.position.y) )
        
        this.position.rotate(.05)
        let length2 = Math.sqrt((this.position.x * this.position.x) +(this.position.y * this.position.y) )
        console.log("Lengths:" ,length1,length2)

    }
    public draw() {
        // console.log("drawing", this.collisionShape)
        if (this.name == "particle ball") {
        }
        this.sprite.x = this.position.x - (this.size.x / 2);
        this.sprite.y = this.position.y - (this.size.x / 2);
        this.sprite.draw();
        // this.collisionShape.draw('#f00');
    }

    private normalize(vec: Vector2) {
        let hyp = Math.sqrt((vec.x * vec.x) + (vec.y + vec.y))
        return new Vector2(vec.x / hyp, vec.y / hyp)

    }
    public collide(entity: Entity) {

        if (entity instanceof Ball) {
            let difference = entity.position.difference(this.position)
            // console.log("difference", difference)
        }
        else {

            // console.log("Collided", entity.type, entity.id)
            this.velocity.y = - this.velocity.y * ((Math.sqrt(this.velocity.y + 500)) / 30)
            // this.velocity.y = this.velocity.y < 1 ? 0 : this.velocity.y
            this.position.y = entity.position.y - (this.size.x / 2)
            this.velocity.x *= .9
        }
    }

}