import { BaseEntity, EntityOption, EntityOptionType } from "./baseEntity";
import { Vector2 } from 'jsgame'


export class TestEntity extends BaseEntity {

    public static options = [
        new EntityOption("name", EntityOptionType.String),
        new EntityOption("position", EntityOptionType.Vector)
    ]

    name: string;
    position: Vector2;

    constructor({ name, position }) {
        super();
        this.name = name;
        this.position = position;

    }

}