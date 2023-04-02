const { Configuration, OpenAIApi } = require ('openai');
const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const token = process.env.API_TOKEN;
const configuration = new Configuration ( {apiKey: token} );
const openai = new OpenAIApi( configuration );
const path = require('path');
const { log } = require('console');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('public'))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

app.post('/message', (req, res) => {
    console.log('post message', req.body.prompt);
    const poemSubject = req.body.prompt
    const poemType = req.body.poemType
    const prompt =   'write me a ' + poemType + ' poem about ' +  poemSubject
    console.log( prompt );
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1024
    })

    response.then((data) => {
        const message = {message: data.data.choices[0].text};
        res.send(message);

    }).catch((err) => {
        console.log('err', err);
        res.send(err);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});
  