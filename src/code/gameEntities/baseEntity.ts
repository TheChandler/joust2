





export abstract class BaseEntity {


    public static options: EntityOption[]

    public static getOptions(){
        return this.options
    }

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