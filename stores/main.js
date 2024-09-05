import {createPinia, defineStore, setActivePinia} from 'pinia';
import {MeshBasicMaterial, SRGBColorSpace, TextureLoader} from "three";

const pinia = createPinia()
setActivePinia(pinia)

export const useTextureStore = defineStore({
    id: 'texture',
    state: () => ({
        name: 'tex_dark-moody-forest',
        path: '/textures/compressed/tex_dark-moody-forest.png',
        color: 0x00ff00,
    }),
    getters: {
        material: (state) => {
            const texture = new TextureLoader().load(state.path);
            texture.colorSpace = SRGBColorSpace
            return new MeshBasicMaterial({
               map: texture,
               transparent: true,
            });
        },
    },
    actions: {
        changeTexture(texture) {
            this.name = texture;
            this.path = '/textures/compressed/' + texture + '.png';
        }
    }
});

export const useBaseStore = defineStore({
    id: 'base',
    state: () => ({
        color: '#000000',
    }),
    getters: {
        material: (state) => {
            return new MeshBasicMaterial({ color: state.color });
        },
    },
    actions: {
        changeColor(color) {
            this.color = color;
        }
    }
});

export const useModelStore = defineStore({
    id: 'model',
    state: () => ({
        shape: 'twin-tip',
        profile: 'hybrid-rocker',
    }),
    getters: {
        path: (state) => {
            let path = '/mesh/' + 'board' + '_' + state.shape + '_' + state.profile + '.gltf';
            return path;
        }
    },
    actions: {
        changeShape(shape) {
            this.shape = shape;
        },
        changeProfile(profile) {
            this.profile = profile;
        }
    }
});

export const useConfigStore = defineStore({
    id: 'config',
    state: () => ({
        config: '' // default config can be set in selection.js
    }),
    actions: {
        update(config) {
            this.config = config.replace('#', '');
        }
    }
});