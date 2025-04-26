import { IShape, Shape } from "jsgame/build/IShape.js";
import { ctx, shapeFactory } from "../gameMain.js";
import { Entity, EntityOption, EntityOptionType } from "./Entity.js";
import { Circle, Sprite, Vector2, CreateImage } from 'jsgame'
import { EntityWIthPosition } from "./EntityWithPosition.js";
import { version } from "typescript";


//Todo: Fix createimage naming capitalization and filename
let spritePlaceholder = CreateImage('./assets/images/testpng.png')

export class EditorEntity extends EntityWIthPosition {

    public static options = [
        new EntityOption("name", EntityOptionType.String),
        new EntityOption("position", EntityOptionType.Vector),
        new EntityOption("size", EntityOptionType.Vector)
    ]

    name: string;
    shape: Sprite;
    size: Vector2;
    isActive: boolean = false;
    id: string;
    type: string;
    constructor({ name, position, size, id, type, image }) {
        super();
        this.name = name;
        this.id = id;
        this.type = type;
        this.position = position;
        this.size = size;
        
        this.shape = shapeFactory.createSprite(image ?? spritePlaceholder, position.x, position.y, size.x, size.y)
    }
    public update() {
        this.shape.draw('#f00');
    }



    public draw() {
        // TODO: update sprite class to use vector2 as position and size. This will allow sharing of values more directly


        this.shape.x = this.position.x;
        this.shape.y = this.position.y;
        this.shape.width = this.size.x;
        this.shape.height = this.size.y;

        this.shape.draw();
    }
    public isAtLocation(vec) {
        let {x, y } = vec
        if (this.shape.collides(new Vector2(null, x, y))) {
            console.log('returning true')
            return true
        }
        return false
    }

    // selected: "br" | "bl" | "tl" | "tr" | "e" //Bottom/top left/right e = everything 

    selected: string= "Horse";
    //Picks out a certain part for dragging with the mouse
    public selectForMovement(point) {
        

        let bl = new Vector2(null, this.position.x, this.position.y)
        let br = new Vector2(null, this.position.x + this.size.x, this.position.y)
        let tl = new Vector2(null, this.position.x, this.position.y + this.size.y)
        let tr = new Vector2(null, this.position.x + this.size.x, this.position.y + this.size.y)

        let THRESHHOLD = 20 // How close the click has to be to select a point 

        this.selected = null;
        console.log("dist",bl.distanceTo(point))
        if (bl.distanceTo(point) < THRESHHOLD) {
            console.log("LESS THAN THE DISTACNE")
            this.selected = "bl"
            console.log(this.selected)
        }
        if (br.distanceTo(point) < THRESHHOLD) {
            this.selected = "br"
        }
        if (tl.distanceTo(point) < THRESHHOLD) {
            this.selected = "tl"
        }
        if (tr.distanceTo(point) < THRESHHOLD) {
            this.selected = "tr"
        }
        if (this.selected == null) {
            this.selected = 'e'
        }
    }

    // A thing was moved. 
    public move(vec: Vector2) {
        switch (this.selected) {
            case "bl":
                this.position.add(vec)
                this.size.x -= vec.x;
                this.size.y -= vec.y;
                break;
            case "br":
                this.size.x += vec.x;
                this.position.y += vec.y
                this.size.y -= vec.y
                break;
            case "tl":
                this.size.y += vec.y;
                this.position.x += vec.x
                this.size.x -= vec.x
                break;
            case "tr":
                this.size.add(vec);
                break;
            case "e":
                this.position.add(vec)
                break;
        }

    }

}