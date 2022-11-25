import app from './app';

require('dotenv').config();

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Ejemplo app listening at http://localhost:${port}`);
});
