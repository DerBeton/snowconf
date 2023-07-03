import { defineStore } from 'pinia';
import {MeshBasicMaterial, TextureLoader} from "three";

export const useTextureStore = defineStore({
    id: 'texture',
    state: () => ({
        name: 'text_jungle-1',
        path: '/textures2/text_jungle-1.png',
        color: 0x00ff00,
    }),
    getters: {
        material: (state) => {
            // return new MeshBasicMaterial({ color: state.color });
            const texture = new TextureLoader().load(state.path);
            return new MeshBasicMaterial({
               map: texture,
               transparent: true
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