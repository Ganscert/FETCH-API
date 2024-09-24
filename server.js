import express, { json } from 'express';
import { moviesRouter } from './routers/movies.js';
import { corsMiddleware } from './middlewares/cors.js';
import fs from 'node:fs';

const html = fs.readFileSync('./web/index.html', 'utf-8');
const app = express();

app.use(json());
app.use(corsMiddleware);
app.disable('x-powered-by'); // Deshabilitar el header X-Powered-By: Express

app.use('/movies', moviesRouter);

// Cambia la ruta para servir el archivo HTML
app.get('/', (req, res) => {
  res.send(html); 
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
