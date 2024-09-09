import {useBaseStore, useConfigStore, useModelStore, useTextureStore} from "~/stores/main";
import {config_01} from "~/init/configs";

export const useSelection = () => {
    const storeModel = useModelStore();
    const storeTexture = useTextureStore();
    const storeBase = useBaseStore();
    const storeConfig = useConfigStore();

    const currVersion = '01'; // current version of the app
    const currConfig = loadMatchingConfig(currVersion); // config from current Version
    let loadConfig = null; // config from version which was used by the url
    let baseConfig = getDefaultConfig(); // initial config selection if no custom url is given

    /* returns string representation of the current config */
    function getDefaultConfig() {
        let defaultConfigString = currVersion + '_';
        let fallbackOption = 1; // used if default prop is not set

        if(!currConfig) {
            return null;
        }

        for (const [key, value] of Object.entries(currConfig)) {
            // if default prop exists add otherwise use first entry
            if(currConfig[key].hasOwnProperty("default")) {
                defaultConfigString += currConfig[key].default
            } else {
                defaultConfigString += toMultiDigit(fallbackOption, currConfig[key].slots)
            }
        }
        return defaultConfigString;
    }

    /* initial config when setting up */
    function setDefaultConfig() {
        updateConfig(baseConfig)
    }

    /* updates the selected value based on the config hash */
    function updateConfig(configString) {

        let config = cleanConfig(configString);

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
                    storeModel.changeShape(value.map[selection]);
                    break;
                case 'profile':
                    storeModel.changeProfile(value.map[selection]);
                    break;
                case 'top':
                    storeTexture.changeTexture(value.map[selection]);
                    break;
                case 'base':
                    storeBase.changeColor(value.map[selection]);
                    break;
                default:
            }
        }
    }

    function getSelection() {
        return currVersion + "_" + findKey(currConfig.shape.map, currConfig.shape.store.shape) + findKey(currConfig.profile.map, currConfig.profile.store.profile) + findKey(currConfig.top.map, currConfig.top.store.name) + findKey(currConfig.base.map, currConfig.base.store.color);
    }

    // generates the url for the selected configuration
    function selectionUrl() {
        return "#" + currVersion + "_" + findKey(currConfig.shape.map, storeModel.shape) + findKey(currConfig.profile.map, storeModel.profile) + findKey(currConfig.top.map, storeTexture.name) + findKey(currConfig.base.map, storeBase.color);
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

    function isValid(config) {

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

    return {
        setDefaultConfig, updateConfig, getSelection, selectionUrl,isValid
    }

}