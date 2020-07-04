const axios = require('axios')
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 5000;

const getBreeds = async () => {
  try {
    return await axios.get('https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/testtest.txt')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = await getBreeds()

  if (breeds.data) {
    console.log(`Got breeds`)
  }

  return breeds.data
}

app.use(express.static(path.join(__dirname, '/../build')));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/../build/index.html'))
})

app.get('/garden', (req, res) => {
  res.sendFile(path.join(__dirname+'/../build/index.html'))
})

// create a GET route
app.get('/express_backend', async (req, res) => {
  var testVar;
  const response = async() => {
    await axios.get('https://vegetableswebsite.blob.core.windows.net/vegetablesinformation/testtest.txt')
       .then((response) => {
        testVar = response
        console.log('abc')
      })
    }
  testVar = await countBreeds()
  console.log(testVar)
  res.send({ express: testVar });
});