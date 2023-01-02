import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();

const hostname = '0.0.0.0';

const port = Number(process.env.PORT) || 3005;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
