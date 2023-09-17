import express from 'express';
import router from './routes/index';
import path from 'path';

const port = process.env.PORT || 5000;
const app = express()
// for serializing json enconded response
app.use(express.json());

// use router for redirecting request
app.use(router);

//serve static file uI_PUBLIC directory
app.use(express.static('UI_Public'));

app.listen(port, '0.0.0.0', () => {
  console.log(`running express server on port ${port}`);
});
