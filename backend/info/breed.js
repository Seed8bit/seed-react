const axios = require('axios');
const breedInfoMap = new Map([
    ['tomato', 'https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/tomato.md'],
    ['redpepper', 'https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/redpepper.md'],
    ['potato', 'https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/potato.md'],
    ['lettuce', 'https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/lettuce.md'],
    ['greenonion', 'https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/greenonion.md'],
    ['eggplant', 'https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/eggplant.md'],
    ['cucumber', 'https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/cucumber.md'],
    ['carrot', 'https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/carrot.md'],
]);

const getBreedInfo = async (vegeName) => {
    if (vegeName) {
        return await axios.get(breedInfoMap.get(vegeName));
    }
    throw Error(`No breed info defined by given vege name: ${vegeName}`);
};

module.exports.getBreedInfo = getBreedInfo;
