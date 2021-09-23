import express, { Express} from 'express';
import axios from 'axios';

const apiKey = process.env.API_KEY
const baseApiURl = 'https://www.googleapis.com/youtube/v3'

const app: Express = express();
const PORT: string | number = 3000;


app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/search', async (req, res) => {
    const url = `${baseApiURl}/search?key=${apiKey}&type=video&part=snippet&q=cats`;
    const response = await axios.get(url);
    const titles = response.data.items.map((item: any) => item.snippet.title);
    res.send(titles);
})

app.listen(PORT, () => {
    console.log('App has started, listening on port 3000');
})

