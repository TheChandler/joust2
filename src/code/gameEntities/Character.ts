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
enum walkingState {
    LEFT_1,
    LEFT_2,
    LEFT_3,
    RIGHT_1,
    RIGHT_2,
    RIGHT_3,
    STANDING
}
const WALKING_SPEED_1 = 1.5;
const WALKING_SPEED_2 = 4;
const WALKING_SPEED_3 = 10;
const DELAY_TIME = 50;

export class Character extends Entity {
    static hasPosition = true;
    static hasSize = true;
    static image = CreateImage('./assets/images/flamingo.png');
    collisionType: COLLISION_TYPE = COLLISION_TYPE.MOBILE_COLLISION;

    state: CharacterState;
    sprite: DrawableSprite;
    velocity: Vector2;

    walkingState: walkingState = walkingState.STANDING;
    timer: number = 0;


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

    public handleInput(input: Input) { }
}

function makeAirState(character: Character): CharacterState {
    character.velocity.y = -10
    return {
        update: (input: Input) => {
            // if (input.left) {
            //     character.velocity.x += -1;
            // }

            // if (input.right) {
            //     character.velocity.x += 1;
            // }

            // if (Math.abs(character.velocity.x) > 10) {
            //     character.velocity.x = 10 * Math.sign(character.velocity.x);
            // }
            // if (input.jump) {
            //     character.velocity.y += -2;
            // }

            if (Math.abs(character.velocity.x) < 0.4) {
                character.velocity.x = 0;
            }
            character.velocity.y += .8;
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
    character.walkingState = walkingState.STANDING;
    return {
        update: (input: Input) => {
            character.timer++;
            if (input.jump) {
                character.state = makeAirState(character);
                return;
            }

            if (input.left) {
                switch (character.walkingState) {
                    case walkingState.LEFT_1:
                        if (character.timer > DELAY_TIME) {
                            character.walkingState = walkingState.LEFT_2;
                            character.timer = 0;
                        }
                        break;
                    case walkingState.LEFT_2:
                        if (character.timer > DELAY_TIME) {
                            character.walkingState = walkingState.LEFT_3;
                            character.timer = 0;
                        }
                        break;
                    case walkingState.LEFT_3:
                        break;
                    case walkingState.RIGHT_1:

                    case walkingState.RIGHT_2:
                    case walkingState.RIGHT_3:
                        character.timer = 0;
                        character.walkingState = walkingState.STANDING
                        break;
                    case walkingState.STANDING:
                        if (character.timer > DELAY_TIME) {
                            character.walkingState = walkingState.LEFT_1;
                            character.timer = 0;

                        }
                        break;
                }
            } else if (input.right) {
                switch (character.walkingState) {
                    case walkingState.RIGHT_1:
                        if (character.timer > DELAY_TIME) {
                            character.walkingState = walkingState.RIGHT_2;
                            character.timer = 0;
                        }
                        break;
                    case walkingState.RIGHT_2:
                        if (character.timer > DELAY_TIME) {
                            character.walkingState = walkingState.RIGHT_3;
                            character.timer = 0;
                        }
                        break;
                    case walkingState.RIGHT_3:
                        break;
                    case walkingState.LEFT_1:
                    case walkingState.LEFT_2:
                    case walkingState.LEFT_3:
                        character.walkingState = walkingState.STANDING
                        character.timer = 0
                        break;
                    case walkingState.STANDING:
                        if (character.timer > DELAY_TIME) {
                            character.walkingState = walkingState.RIGHT_1;
                            character.timer = 0;

                        }
                        break;
                }
            }

            switch (character.walkingState) {
                case walkingState.LEFT_1:
                    character.velocity.x = -WALKING_SPEED_1;
                    break;
                case walkingState.LEFT_2:
                    character.velocity.x = -WALKING_SPEED_2;
                    break;
                case walkingState.LEFT_3:
                    character.velocity.x = -WALKING_SPEED_3;
                    break;
                case walkingState.RIGHT_1:
                    character.velocity.x = WALKING_SPEED_1;
                    break;
                case walkingState.RIGHT_2:
                    character.velocity.x = WALKING_SPEED_2;
                    break;
                case walkingState.RIGHT_3:
                    character.velocity.x = WALKING_SPEED_3;
                    break
                case walkingState.STANDING:
                    character.velocity.x = 0;
                    break;
            }


        },
        collide: (entity: Entity) => {
            // Colliding with something while grounded
        },
    };
}