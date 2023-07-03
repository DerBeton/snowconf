import {useBaseStore, useModelStore, useTextureStore} from "~/stores/main";

const storeModel = useModelStore();
const storeBase = useBaseStore();
const storeTexture = useTextureStore();

export const config_01 = {
    shape: {
        slots: 1,
        store: storeModel,
        map: {
            1: "twin-tip",
            2: "twin-tip-2",
            3: "directional",
            4: "tapered"
        }
    },
    profile: {
        slots: 1,
        store: storeModel,
        map: {
            1: "camber",
            2: "rocker",
            3: "hybrid-camber",
            4: "hybrid-rocker",
            5: "zero"
        }
    },
    top: {
        slots: 2,
        store: storeTexture,
        map: {
            '01': "tex_low-poly",
            '02': "tex_dark-moody-forest",
            '03': "tex_mountain_clouds",
            '04': "tex_blue-lines",
            '05': "tex_fireball",
            '06': "tex_fingerprint",
            '07': "tex_jungle"
        }
    },
    base: {
        slots: 2,
        store: storeBase,
        map: {
            '01': "#000000",
            '02': "#16262E",
            '03': "#A34329",
            '04': "#FF0000",
            '05': "#F3A712",
            '06': "#28AFB0",
            '07': "#DFDFDF"
        }
    },
}
