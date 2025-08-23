#include <cstdint>
#include <algorithm>

#define EXPORT __attribute__((used))

const int ARRAY_SIZE = 10000000;

extern "C"
{

    // Change these
    static int CANVAS_WIDTH = 800;
    static int CANVAS_HEIGHT = 450;
    static int PIXEL_BUFFER_SIZE = CANVAS_WIDTH * CANVAS_HEIGHT * 4; // 1440000
    static uint8_t pixelBuffer[1440000];

    static int16_t xpositions[ARRAY_SIZE];
    static int16_t ypositions[ARRAY_SIZE];
    static int16_t xvel[ARRAY_SIZE];
    static int16_t yvel[ARRAY_SIZE];
    static int16_t lifetime[ARRAY_SIZE];
    static int32_t nextOpen = 0;

    EXPORT int16_t *get_x_positions()
    {
        return xpositions;
    }

    EXPORT int16_t *get_y_positions()
    {
        return ypositions;
    }

    EXPORT int16_t *get_x_vel()
    {
        return xvel;
    }

    EXPORT int16_t *get_y_vel()
    {
        return yvel;
    }

    EXPORT int16_t *get_lifetime()
    {
        return lifetime;
    }

    EXPORT int32_t *get_next_open()
    {
        return &nextOpen;
    }

    EXPORT int get_array_size()
    {
        return ARRAY_SIZE;
    }
    EXPORT uint8_t *get_pixelBuffer()
    {
        return pixelBuffer;
    }

    EXPORT bool init()
    {
        return true;
    }
    EXPORT int testXpositions()
    {
        return xpositions[0] + xpositions[1] + xpositions[2] + xpositions[3] + xpositions[4] + xpositions[5] + xpositions[6] + xpositions[7] + xpositions[8] + xpositions[9];
    }
    EXPORT void testXpositions2()
    {
        for (int i = 0; i < ARRAY_SIZE; i++)
        {
            xpositions[i] = 33;
        }
    }

    EXPORT void update()
    {
        for (int i = 0; i < ARRAY_SIZE; i++)
        {
            if (lifetime[i] > 0)
            {
                xpositions[i] += xvel[i];
                ypositions[i] += yvel[i];
                yvel[i] += 2; // 0x0002
                lifetime[i]--;
            }
        }
    }

    int cordsToIndex(int x, int y)
    {
        return (x + (y * CANVAS_WIDTH)) * 4;
    }
    int countOpacityInAdjacentPixels(index, data)
    {

        // left and right seem swapped for some reason

        int[] indexes = [
            index + (CANVAS_WIDTH * 4) + 3, // Above
            // // index  + 3, // Me?
            index - (CANVAS_WIDTH * 4) + 3,  // Below
            index + (CANVAS_WIDTH * 4) - 1,  // Above + left
            index + -1,                      // Me + left
            index - (CANVAS_WIDTH * 4) + -1, // Below + left
            index + (CANVAS_WIDTH * 4) + 7,  // Above + right
            index + 7,                       // Me + right
            index - (CANVAS_WIDTH * 4) + 7,  // Below + right
        ]

            int totalOpacity = 0;
        for (int i = 0; i < indexes.length; i++)
        {
            if (data[indexes[i]] == 255)
            {
                totalOpacity += data[i]
            }
        }
        return totalOpacity / 8
    }

    EXPORT void draw_update(int offsetX, int offsetY)
    {
        for (int i = 0; i < ARRAY_SIZE; i++)
        {
            if (lifetime[i] > 0)
            {

                int y = (ypositions[i] >> 4) - offsetY;
                // y = std::max(y, 225);
                int x = (xpositions[i] >> 4) - offsetX;

                // int x = offsetX == -400 ? 600 : 300;

                if (x < 0 || x >= CANVAS_WIDTH || y < 0 || y >= CANVAS_HEIGHT)
                {

                    continue;
                }

                int f = cordsToIndex(x, y);

                pixelBuffer[f] = (int8_t)254;
                pixelBuffer[f + 1] = (int8_t)0;
                pixelBuffer[f + 2] = (int8_t)0;
                pixelBuffer[f + 3] = (int8_t)254;
            }
        }

        for (int x = 0; x < CANVAS_WIDTH; x++)
        {
            for (int y = 0; y < CANVAS_HEIGHT; y++)
            {
                int op

                if (x < 20 || x > 780 || y < 20 || y > 430)
                {

                    int i = cordsToIndex(x, y);
                    pixelBuffer[i] = 0;
                    pixelBuffer[i + 1] = 0;
                    pixelBuffer[i + 2] = 0;
                    pixelBuffer[i + 3] = 255;
                }
                else
                {
                    // Sanity check
                    // int i = cordsToIndex(x, y);
                    // pixelBuffer[i] = 255 * ( x/ (double)CANVAS_WIDTH);
                    // pixelBuffer[i + 1] = 255 * ( y/ (double)CANVAS_HEIGHT);
                    // pixelBuffer[i + 2] = 0;
                    // pixelBuffer[i + 3] = 255;
                }
            }
        }
    }
}