





export abstract class Entity {


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