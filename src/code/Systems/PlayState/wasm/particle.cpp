#include <cstdint>

#define EXPORT __attribute__((used))

const int ARRAY_SIZE = 10000000;

extern "C" {

    static int16_t xpositions[ARRAY_SIZE];
    static int16_t ypositions[ARRAY_SIZE];
    static int16_t xvel[ARRAY_SIZE];
    static int16_t yvel[ARRAY_SIZE];
    static int16_t lifetime[ARRAY_SIZE];
    static int32_t nextOpen = 0;

    EXPORT int16_t* get_x_positions() {
        return xpositions;
    }

    EXPORT int16_t* get_y_positions() {
        return ypositions;
    }

    EXPORT int16_t* get_x_vel() {
        return xvel;
    }

    EXPORT int16_t* get_y_vel() {
        return yvel;
    }

    EXPORT int16_t* get_lifetime() {
        return lifetime;
    }

    EXPORT int32_t* get_next_open() {
        return &nextOpen;
    }

    EXPORT int get_array_size() {
        return ARRAY_SIZE;
    }

    EXPORT bool init() {
        return true;
    }
    EXPORT int testXpositions(){
        return xpositions[0]
        + xpositions[1]
        + xpositions[2]
        + xpositions[3]
        + xpositions[4]
        + xpositions[5]
        + xpositions[6]
        + xpositions[7]
        + xpositions[8]
        + xpositions[9];
    }
    EXPORT void testXpositions2(){
        for (int i = 0; i< ARRAY_SIZE; i++){
            xpositions[i] = 33;
        }

    }


    EXPORT void update() {
        for (int i = 0; i < ARRAY_SIZE; i++) {
            if (lifetime[i] > 0) {
                xpositions[i] += xvel[i];
                ypositions[i] += yvel[i];
                yvel[i] += 2; // 0x0002
                lifetime[i]--;
            }
        }
    }
}