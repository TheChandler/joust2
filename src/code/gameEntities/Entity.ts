import { Vector2 } from "jsgame";
import { COLLISION_TYPE } from "../Constants/CollisionTypes"
import { collisionSystem } from "../Systems/PlayState/CollisionSystem"
import { IShape } from "jsgame/build/IShape.js";

export abstract class Entity {

    name: string;
    id: string;
    type: string;
    /** Identifies whether the CLASS has a position field */
    static hasPosition: boolean = false;
    position: Vector2;
    /** Identifies whether the CLASS has a size field */
    static hasSize: boolean = false;
    /** Width and height of object */
    size: Vector2;
    static image
    

    /** Dictate the type of checking that will be done for collisions */
    collisionType: COLLISION_TYPE = COLLISION_TYPE.NO_COLLISION;
    // abstract collisionType: COLLISION_TYPE;
    /** IShape representing object for collision detection purposes */
    collisionShape: IShape = null;

    public static options: EntityOption[]

    public static getOptions() {
        return this.options
    }

    public constructor() {
        
    }
    public create(){
        if (this.collisionType === COLLISION_TYPE.MOBILE_COLLISION || this.collisionType === COLLISION_TYPE.STATIC_COLLISION) {
            collisionSystem.add(this);
        }
    }

    public destroy() {
        if (this.collisionType === COLLISION_TYPE.MOBILE_COLLISION || this.collisionType === COLLISION_TYPE.STATIC_COLLISION) {
            collisionSystem.remove(this);
        }
    }


    public abstract update()

    public collide(entity: Entity) {
        throw Error("Collsion on non-implented collide method");
    }
    public draw(){

    }


}

export enum EntityOptionType {
    String,
    Number,
    Vector
}

export class EntityOption {
    name: string;
    type: EntityOptionType;
    constructor(name: string, type: EntityOptionType) {
        this.name = name;
        this.type = type;
    }
}