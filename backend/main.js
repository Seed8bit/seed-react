const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

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

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '/../build')));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});

app.get('/garden', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});

app.get('/info', async (req, res) => {
  console.log('Getting breed info ...');
  try {
    const vegeName = req.query.vegeName;
    breedInfo = await getBreedInfo(vegeName);
    res.send({markdown: breedInfo.data});
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Getting breed info failure!'});
  }
});
