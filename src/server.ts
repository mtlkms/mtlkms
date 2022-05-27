import * as express from 'express';
import * as bodyParser from 'body-parser';
import connection from './dbconnection';
import routes from './routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

const PORT: number = 3000;
const server = app.listen(PORT, () => {
    console.log('Example app listening at http://localhost:%s', PORT);
});

export default app;