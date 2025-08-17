import { canvas, ctx, killGame } from '../../gameMain'


export class ParticleSystem {

    static ARRAY_SIZE = 10000000;

    xpositions = new Int16Array(ParticleSystem.ARRAY_SIZE)
    ypositions = new Int16Array(ParticleSystem.ARRAY_SIZE)
    xvel = new Int16Array(ParticleSystem.ARRAY_SIZE)
    yvel = new Int16Array(ParticleSystem.ARRAY_SIZE)
    lifetime = new Int16Array(ParticleSystem.ARRAY_SIZE)


    nextOpen: number = 0;
    constructor() {
        // for (let i = 0; i < ParticleSystem.ARRAY_SIZE; i++) {
        //     this.xvel[i] = Math.random() * 200
        //     this.yvel[i] = (Math.random() * 60) - 30
        //     this.ypositions[i] = canvas.height << 4
        //     this.lifetime[i] = 500
        // }
        this.xpositions[0] = 0
        this.ypositions[0] = 0
        this.lifetime[0] = 100

        // this.xvel[0] = 160;
        // this.yvel[0] = 0
        // this.xpositions[0] = 50
    }

    add(x, y, xvel, yvel, lifetime) {
        let i = this.nextOpen++;
        this.xvel[i] = xvel;
        this.yvel[i] = yvel;
        // this.xvel[i] = 0;
        // this.yvel[i] = 0;
        this.xpositions[i] = x << 4;
        this.ypositions[i] = y << 4;
        // this.xpositions[i] = 0;
        // this.ypositions[i] = 0;
        this.lifetime[i] = lifetime
    }
    update() {
        for (let i = 0; i < ParticleSystem.ARRAY_SIZE; i++) {
            if (this.lifetime[i]) {
                // console.log(i)
                this.xpositions[i] += this.xvel[i]
                this.ypositions[i] += this.yvel[i]
                this.yvel[i] += 0x0002
                this.lifetime[i] = this.lifetime[i] - 1
                if (!this.lifetime[i]) {
                    this.nextOpen = i
                }
            }
        }
    }
    itteration = 100;

    bmap: ImageBitmap;
    bmap2: ImageBitmap;
    draw() {
        if (!this.itteration) {
            // killGame()
            // return
        }
        this.itteration++;
        // console.time()

        // let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let imageData = new ImageData(canvas.width, canvas.height);
        let data = imageData.data


        let leftBound = ctx.position.x - (ctx.size.x / 2)
        let rightBound = ctx.position.x + (ctx.size.x / 2)
        let upperBound = ctx.position.y - (ctx.size.y / 2)
        let lowerBound = ctx.position.y + (ctx.size.y / 2)

        let offsetX = leftBound
        let offsetY = upperBound


        // Draw main particle
        for (let i = 0; i < ParticleSystem.ARRAY_SIZE; i++) {
            if (this.lifetime[i]) {

                let y = (this.ypositions[i] >> 4) - offsetY
                let x = (this.xpositions[i] >> 4) - offsetX

                let pixel = x + (y * canvas.width)
                let f = pixel * 4;
                data[f] = 255;
                data[f + 1] = 0
                data[f + 2] = 0
                data[f + 3] = 255

            }
        }

        let imageData2 = new ImageData(canvas.width, canvas.height);
        let data2 = imageData2.data
        // particle post processing
        data.forEach((p, i) => {
            if (i % 4 == 0 && data[i + 3] == 0) {
                if (countOpacityInAdjacentPixels(i, data) > 0) {
                    data2[i + 3] = countOpacityInAdjacentPixels(i, data) / 8
                    data2[i] = 255;

                }

            }
        })
        createImageBitmap(imageData)
            .then((x) => {
                this.bmap = x;
            });
        createImageBitmap(imageData2)
            .then((x) => {
                this.bmap2 = x;
            });

        ctx.drawImage(this.bmap, ctx.position.x - ctx.size.x / 2, ctx.position.y - ctx.size.y / 2);
        ctx.drawImage(this.bmap2, ctx.position.x - ctx.size.x / 2, ctx.position.y - ctx.size.y / 2);
        // ctx.putImageData(imageData, 0, 0);
        // console.timeEnd()
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

    // console.log("Differences", differences, indexes)

    let totalOpacity = 0;
    indexes.forEach(i => {
        if (i > 0) {
            totalOpacity += data[i]
        }
    })
    return totalOpacity
}