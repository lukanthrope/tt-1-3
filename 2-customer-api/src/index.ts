import express, { urlencoded, json } from 'express';
import { customerRouter } from './routes/customer.route.js';
import { config } from './config.js';
import { setupSwagger } from './swagger.js';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/customers', customerRouter);

setupSwagger(app);

app.listen(config.PORT, () => {
  console.log(`Server is listening at port ${config.PORT}`);
});
