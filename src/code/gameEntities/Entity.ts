import { Vector2 } from "jsgame";






export abstract class Entity {

    name: string;
    id: string;
    type: string;
    /** Identifies whether the CLASS has a position field */
    static hasPosition: boolean;
    position: Vector2;
    /** Identifies whether the CLASS has a size field */
    static hasSize: boolean;
    size: Vector2 | number;

    public static options: EntityOption[]

    public static getOptions(){
        return this.options
    }

    public abstract update()

} 

export enum EntityOptionType{
    String,
    Number,
    Vector
}

export class EntityOption{
    name: string;
    type: EntityOptionType;
    constructor(name: string, type: EntityOptionType){
        this.name = name;
        this.type = type;
    }
}