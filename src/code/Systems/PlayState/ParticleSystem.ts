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
    draw() {
        if (!this.itteration) {
            // killGame()
            // return
        }
        this.itteration--;
        // console.time()
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data


        let leftBound = ctx.position.x - (ctx.size.x / 2)
        let rightBound = ctx.position.x + (ctx.size.x / 2)
        let upperBound = ctx.position.y - (ctx.size.y / 2)
        let lowerBound = ctx.position.y + (ctx.size.y / 2)

        let offsetX = leftBound
        let offsetY = upperBound



        for (let i = 0; i < ParticleSystem.ARRAY_SIZE; i++) {
            if (this.lifetime[i]) {

                let y = (this.ypositions[i] >> 4) - offsetY
                let x = (this.xpositions[i] >> 4) - offsetX

                let pixel = x + (y * canvas.width)
                let f = pixel * 4;

                data[f] = 255;
                data[f + 1] = 0
                data[f + 2] = 0

            }
        }

        ctx.putImageData(imageData, 0, 0);
        // console.timeEnd()
    }

}