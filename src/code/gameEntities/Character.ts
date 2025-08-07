import { CreateImage, DrawableSprite, Vector2 } from "jsgame";
import { Entity } from "./Entity.js";
import { inputHandler, shapeFactory } from "../gameMain.js";
import { COLLISION_TYPE } from "../Constants/CollisionTypes.js";
import { Platform } from "./Platform.js";

interface Input {
    left: boolean;
    right: boolean;
    jump: boolean;
}

interface CharacterState {
    update(input: Input): void;
    collide(entity: Entity): void;
}

export class Character extends Entity {
    static hasPosition = true;
    static hasSize = true;
    static image = CreateImage('./assets/images/flamingo.png');
    collisionType: COLLISION_TYPE = COLLISION_TYPE.MOBILE_COLLISION;

    state: CharacterState;
    sprite: DrawableSprite;
    velocity: Vector2;

    constructor({ position, velocity, id }) {
        super();
        this.name = "Character";
        this.position = position;
        this.id = id;
        this.sprite = shapeFactory.createSprite(Character.image, this.position.x, this.position.y, 40, 40);
        this.collisionShape = this.sprite;
        if (velocity) {
            this.velocity = velocity;
        } else {
            this.velocity = new Vector2(0, 0);
        }
        this.state = makeGroundedState(this);
        this.create();
    }

    public update() {
        this.collisionShape = this.sprite;
        let input = {
            left: inputHandler.get('ArrowLeft') || inputHandler.get('KeyA'),
            right: inputHandler.get('ArrowRight') || inputHandler.get('KeyD'),
            jump: inputHandler.get('Space'),
        };

        this.state.update(input);

        console.log(this.position, this.velocity)
        this.position = this.position.add(this.velocity);
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
    }

    public draw() {
        this.sprite.draw();
    }

    public collide(entity: Entity): void {
        this.state.collide(entity);
    }

    public handleInput(input: Input) {}
}

function makeAirState(character: Character): CharacterState {
    return {
        update: (input: Input) => {
            if (input.left) {
                character.velocity.x += -1;
            }

            if (input.right) {
                character.velocity.x += 1;
            }

            if (Math.abs(character.velocity.x) > 10) {
                character.velocity.x = 10 * Math.sign(character.velocity.x);
            }
            if (input.jump) {
                character.velocity.y += -2;
            }

            if (Math.abs(character.velocity.x) < 0.4) {
                character.velocity.x = 0;
            }
            character.velocity.y += 0.3;
        },
        collide: (entity: Entity) => {
            if (entity instanceof Platform) {
                character.velocity.y = 0;
                character.position.y = entity.position.y - entity.size.y;
                character.state = makeGroundedState(character);
            }
        },
    };
}

function makeGroundedState(character: Character): CharacterState {
    return {
        update: (input: Input) => {
            if (input.left) {
                character.velocity.x += -1;
            }

            if (input.right) {
                character.velocity.x += 1;
            }
            if (input.jump) {
                character.state = makeAirState(character);
                character.velocity.y = -10;
            }

            if (Math.abs(character.velocity.x) < 0.4) {
                character.velocity.x = 0;
            }
        },
        collide: (entity: Entity) => {
            // Colliding with something while grounded
        },
    };
}