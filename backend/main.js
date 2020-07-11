const express = require('express');
const path = require('path');
const breed = require('./info/breed');

const app = express();
const port = process.env.PORT || 5000;
const frontendBuildPath = '../frontend/build';

app.use(express.static(path.join(__dirname, frontendBuildPath)));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + `/${frontendBuildPath}/index.html`));
});

app.get('/myGarden', (req, res) => {
  res.sendFile(path.join(__dirname + `/${frontendBuildPath}/index.html`));
});

app.get('/info', async (req, res) => {
  try {
    const vegeName = req.query.vegeName;
    breedInfo = await breed.getBreedInfo(vegeName);
    res.send({markdown: breedInfo.data});
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Getting breed info failure!'});
  }
});
