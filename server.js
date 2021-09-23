const express = require('express');
const axios = require('axios');

const apiKey='AIzaSyCvZbp0Koj7sfqFQBu-dBEyQMH7tJZL9As';
const baseApiURl = 'https://www.googleapis.com/youtube/v3'

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/search', async (req, res) => {
    const url = `${baseApiURl}/search?key=${apiKey}&type=video&part=snippet&q=cats`;
    const response = await axios.get(url);
    const titles = response.data.items.map((item) => item.snippet.title);
    console.log(titles);
    res.send(titles);
    console.log('response', response);
})

app.listen(port, () => {
    console.log('App has started, listening on port 3000');
})

