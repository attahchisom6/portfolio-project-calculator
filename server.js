import express from 'express';
 
const port = process.env.PORT || 5000;
const app = express()
// for serializing json enconded response
app.use(express.json());

//serve static file uI_PUBLIC directory
app.use(express.static('UI_public'));

app.listen(port, '0.0.0.0', () => {
  console.log(`running express server on port ${port}`);
});
