import * as express from 'express';
import connection from './dbconnection';

import routes from './router/routes';
import accountRouter from './router/account/routes';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);
app.use('/account', accountRouter);

const PORT: number = 3000;
const server = app.listen(PORT, () => {
    console.log('Example app listening at http://localhost:%s', PORT);
});

export default app;