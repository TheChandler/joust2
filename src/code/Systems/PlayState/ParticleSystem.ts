import { canvas, ctx } from '../../gameMain';
import ModuleFactory from './wasm/particle.js';

export class ParticleSystem {

    arraySize: number;

    // These will become views into the Wasm memory
    xpositions: Int16Array;
    ypositions: Int16Array;
    xvel: Int16Array;
    yvel: Int16Array;
    lifetime: Int16Array;

    imageData1: Uint8ClampedArray;
    imageData2: Int8Array;

    nextOpen: number = 0;

    private wasmModule: EmscriptenModule & { ccall: any };
    private nextOpenPtr: number;

    constructor() {
        // The constructor is now empty. Initialization is done in the async initialize method.
        this.initialize();
        console.log("SIZE : ", canvas.width, canvas.height)
    }
    private initialized: boolean = false;
    async initialize() {
        console.log('Initializing Particle System and Wasm...');
        this.wasmModule = await ModuleFactory();

        // Initialize the wasm module and allocate memory
        const initSuccess = this.wasmModule.ccall('init', 'boolean', [], []);
        if (!initSuccess) {
            throw new Error("Failed to initialize wasm particle system: memory allocation failed.");
        }

        this.arraySize = this.wasmModule.ccall('get_array_size', 'number', [], []);

        // Get pointers to the arrays in wasm memory
        const x_ptr = this.wasmModule.ccall('get_x_positions', 'number', [], []);
        const y_ptr = this.wasmModule.ccall('get_y_positions', 'number', [], []);
        const xvel_ptr = this.wasmModule.ccall('get_x_vel', 'number', [], []);
        const yvel_ptr = this.wasmModule.ccall('get_y_vel', 'number', [], []);
        const lifetime_ptr = this.wasmModule.ccall('get_lifetime', 'number', [], []);
        this.nextOpenPtr = this.wasmModule.ccall('get_next_open', 'number', [], []);

        const imageData1_ptr = this.wasmModule.ccall('get_pixelBuffer', 'number', [], []);


        // Create TypedArray views that point directly to the wasm memory
        try {

            this.xpositions = new Int16Array(this.wasmModule.HEAP16.buffer, x_ptr, this.arraySize);
            this.ypositions = new Int16Array(this.wasmModule.HEAP16.buffer, y_ptr, this.arraySize);
            this.xvel = new Int16Array(this.wasmModule.HEAP16.buffer, xvel_ptr, this.arraySize);
            this.yvel = new Int16Array(this.wasmModule.HEAP16.buffer, yvel_ptr, this.arraySize);
            this.lifetime = new Int16Array(this.wasmModule.HEAP16.buffer, lifetime_ptr, this.arraySize);
            this.imageData1 = new Uint8ClampedArray(this.wasmModule.HEAPU8.buffer, imageData1_ptr, canvas.width * canvas.height * 4);

            // @ts-ignore
            this.imageData = new ImageData(this.imageData1, canvas.width, canvas.height);

        } catch (e) {
            console.error(e)
            console.log(this.wasmModule)
        }
        this.initialized = true;

        // console.log('Particle System initialized successfully.');

        // this.xpositions.fill(66)
        // console.log("XPositions", JSON.stringify(this.xpositions))
        // console.log("WASM TEST 1", this.wasmModule.ccall("testXpositions","number"))

        // this.wasmModule.ccall("testXpositions2", null);
        // console.log("WASM TEST 2", JSON.stringify(this.xpositions))
    }

    add(x: number, y: number, xvel: number, yvel: number, lifetime: number) {
        if (!this.initialized) return; // Not initialized yet

        // Get the next available particle index from wasm memory
        let i = this.nextOpen;
        this.nextOpen = (this.nextOpen + 1) % this.arraySize;

        this.xvel[i] = xvel;
        this.yvel[i] = yvel;
        this.xpositions[i] = x << 4;
        this.ypositions[i] = y << 4;
        this.lifetime[i] = lifetime;

    }

    update() {
        if (!this.initialized) return; // Not initialized yet
        // Call the high-performance update function in WebAssembly
        this.wasmModule.ccall('update', null, [], []);
    }

    itteration = 100;
    bmap: ImageBitmap;
    bmap2: ImageBitmap;

    imageData: ImageData;
    draw() {

        if (!this.initialized) {
            console.log("NOT INITIALIZED");
            return; // Not initialized yet
        }
        if (!this.xpositions) {
            console.log("NOT INITIALIZED")
            return; // Don't draw if not initialized
        }

        if (!this.itteration) {
            // killGame()
            // return
        }
        this.itteration++;


        let leftBound = ctx.position.x - (ctx.size.x / 2)
        let rightBound = ctx.position.x + (ctx.size.x / 2)
        let upperBound = ctx.position.y - (ctx.size.y / 2)
        let lowerBound = ctx.position.y + (ctx.size.y / 2)

        let offsetX = leftBound
        let offsetY = upperBound

        this.imageData.data.fill(0);

        // console.log("offsets", offsetX, offsetY) // -400, -225


        // Draw main particle

        // this.wasmDraw(offsetX, offsetY);
        this.jsDraw(offsetX, offsetY);


        let imageData2 = new ImageData(canvas.width, canvas.height);
        let data2 = imageData2.data
        // particle post processing
        // data2.forEach((p, i) => {
        //     if (i % 4 == 0 && data2[i + 3] == 0) {
        //         if (countOpacityInAdjacentPixels(i, data2) > 0) {
        //             data2[i + 3] = countOpacityInAdjacentPixels(i, data2) / 8
        //             data2[i] = 255;
        //         }

        //     }
        // })
        createImageBitmap(this.imageData)
            .then((x) => {
                this.bmap = x;
            });

        createImageBitmap(imageData2)
            .then((x) => {
                this.bmap2 = x;
            });

        if (this.bmap) {
            ctx.drawImage(this.bmap, ctx.position.x - ctx.size.x / 2, ctx.position.y - ctx.size.y / 2);
        }
        if (this.bmap2) {
            ctx.drawImage(this.bmap, ctx.position.x - ctx.size.x / 2, ctx.position.y - ctx.size.y / 2);
        }
    }
    async wasmDraw(offsetX, offsetY) {
        this.wasmModule.ccall('draw_update', 'void', ['int', 'int'], [offsetX, offsetY]);
    }
    jsDraw(offsetX, offsetY) {
        for (let i = 0; i < this.arraySize; i++) {
            if (this.lifetime[i]) {
                let y = (this.ypositions[i] >> 4) - offsetY
                let x = (this.xpositions[i] >> 4) - offsetX

                if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

                let pixel = x + (y * canvas.width)
                let f = pixel * 4;
                this.imageData1[f] = 255;
                this.imageData1[f + 1] = 0
                this.imageData1[f + 2] = 0
                this.imageData1[f + 3] = 255
            }
        }
    }
}


function convertToCords(i) {
    let y = Math.floor(i / canvas.width);
    let x = i % canvas.width;
    return [x, y]

}
function convertToIndex(x, y) {
    return x + (y * canvas.width)
}
function countOpacityInAdjacentPixels(index, data) {
    // let indexes = [
    //     convertToIndex(x - 1, y - 1),
    //     convertToIndex(x - 1, y),
    //     convertToIndex(x - 1, y + 1),
    //     convertToIndex(x, y - 1),
    //     convertToIndex(x, y),
    //     convertToIndex(x, y + 1),
    //     convertToIndex(x + 1, y - 1),
    //     convertToIndex(x + 1, y),
    //     convertToIndex(x + 1, y + 1)
    // ]


    // left and right seem swapped for some reason
    let indexes = [
        index + (canvas.width * 4) + 3, // Above
        // // index  + 3, // Me?
        index - (canvas.width * 4) + 3, // Below
        index + (canvas.width * 4) - 1, // Above + left
        index + -1, // Me + left
        index - (canvas.width * 4) + -1, // Below + left
        index + (canvas.width * 4) + 7, // Above + right
        index + 7, // Me + right
        index - (canvas.width * 4) + 7, // Below + right
    ]


    let totalOpacity = 0;
    indexes.forEach(i => {
        if (i > 0) {
            totalOpacity += data[i]
        }
    })
    return totalOpacity
}