import { config_01 } from "@/init/configs.js";
import { useConfigStore } from "~/stores/main";

const storeConfig = useConfigStore();

let currVersion = '01'; // current version of the app
let currConfig = loadMatchingConfig(currVersion); // config from current Version
let loadConfig = null; // config from version which was used by the url
let baseConfig = '01_110201'; // initial config selection if no custom url is given

/* updates the selected value based on the config hash */
export function updateConfig(config) {

    config = cleanConfig(config);
    if(!config) {
        config = baseConfig;
    }

    storeConfig.update(config);

    let splitIndex = config.indexOf('_');
    let version = config.substring(0, splitIndex); // first digits until "_".
    let index = splitIndex+1; // starts after splitIndex which is "_".
    loadConfig = loadMatchingConfig(version);

    // specific version not found
    if(loadConfig == null) {
        return false;
    }

    for (const [key, value] of Object.entries(loadConfig)) {

        // get amount of slots needed in config string
        let slot = loadConfig[key].slots;
        let selection = config.substring(index, index+slot);
        index += slot;

        switch (key) {
            case 'shape':
                value.store.changeShape(value.map[selection]);
                break;
            case 'profile':
                value.store.changeProfile(value.map[selection]);
                break;
            case 'top':
                value.store.changeTexture(value.map[selection]);
                break;
            case 'base':
                value.store.changeColor(value.map[selection]);
                break;
            default:
        }
    }
}

export function getSelection() {
    return currVersion + "_" + findKey(currConfig.shape.map, currConfig.shape.store.shape) + findKey(currConfig.profile.map, currConfig.profile.store.profile) + findKey(currConfig.top.map, currConfig.top.store.name) + findKey(currConfig.base.map, currConfig.base.store.color);
}

// generates the url for the selected configuration
export function selectionUrl() {
    return "#" + currVersion + "_" + findKey(currConfig.shape.map, currConfig.shape.store.shape) + findKey(currConfig.profile.map, currConfig.profile.store.profile) + findKey(currConfig.top.map, currConfig.top.store.name) + findKey(currConfig.base.map, currConfig.base.store.color);
}

// used to cleanup config for further usage
function cleanConfig(config) {
    if(config == null || config == '') {
        return false;
    }

    // remove # from config
    config = config.replace('#', '');

    return config;
}

export function isValid(config) {

    config = cleanConfig(config);
    if(!config) {
        return false;
    }

    let splitIndex = config.indexOf('_');
    let version = config.substring(0, splitIndex); // first digits until "_".
    let index = splitIndex+1; // starts after splitIndex which is "_".
    loadConfig = loadMatchingConfig(version);

    // specific version not found
    if(loadConfig == null) {
        return false;
    }

    for (const [key, value] of Object.entries(loadConfig)) {

        // get amount of slots needed in config string
        let slot = loadConfig[key].slots;
        let selection = config.substring(index, index+slot);
        index += slot;

        switch (key) {
            case 'shape':
                if(!value.map.hasOwnProperty(selection)) {
                    return false;
                }
                break;
            case 'profile':
                if(!value.map.hasOwnProperty(selection)) {
                    return false;
                }
                break;
            case 'top':
                if(!value.map.hasOwnProperty(selection)) {
                    return false;
                }
                break;
            case 'base':
                if(!value.map.hasOwnProperty(selection)) {
                    return false;
                }
                break;
            default:
                return false;
        }
    }

    // confCode is too long
    if(config.length > index) {
        return false;
    }

    return true;
}

// gets the correct key from selected values for the hash url #01_120291 etc.
function findKey(obj, searchValue) {
    let foundKey = null;

    for (let key in obj) {
        if (obj[key] === searchValue) {
            foundKey = key;
            break; // stop if key is found
        }
    }
    return foundKey;
}

function loadMatchingConfig(version) {
    switch (version) {
        case '01':
            return config_01;
            break;
        case '02':
            return config_02;
            // future version
            break;
        default:
            return null;
    }
}