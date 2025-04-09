import { BaseEntity } from "./baseEntity";



class TestEntity extends BaseEntity{
    
    name: string;
    number: number;
    test: string;
    
    constructor({name,number,test}){
       super(); 
        this.name = name;
        this.number = number;
        this.test = test;
    }
    
    getDetails(){
        return {
            "name":"string",
            "number":"number",
            "test":"test"
        }
    }
}