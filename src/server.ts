import * as express from 'express';
import * as bodyParser from 'body-parser';
import connection from './dbconnection';
import routes from './routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

const server = app.listen(3000, () => {
    let host :string = server.address().address;
    let port :string = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
});

export default app;