import * as express from 'express';
import connection from './dbconnection';
import routes from './routes';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

const PORT: number = 3000;
const server = app.listen(PORT, () => {
    console.log('Example app listening at http://localhost:%s', PORT);
});

export default app;