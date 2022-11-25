import app from './app';

require('dotenv').config();

const hostname = '0.0.0.0';

const port = process.env.PORT || 3005;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
