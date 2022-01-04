import express, { Express } from 'express';
import { google, youtube_v3 } from 'googleapis';

const apiKey = process.env.API_KEY;
const date = new Date();
const stringDate = date.toISOString();

const youtube: youtube_v3.Youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
});

const app: Express = express();
const PORT: string | number = 3000;

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/search', async (req, res, next) => {
  console.log(apiKey);
  try {
    const listParams: youtube_v3.Params$Resource$Search$List = {
      part: ['snippets'],
      publishedAfter: stringDate,
      type: ['video'],
    };
    const response = await youtube.search.list(listParams);

    console.log(response);
    const titles =
      response && response?.data?.items?.map((item: any) => item.snippet.title);
    res.send(titles);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log('App has started, listening on port 3000');
});
