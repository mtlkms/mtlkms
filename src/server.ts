import * as express from 'express';
import * as cookieParser from 'cookie-parser';

import routes from './router/routes';
import userRoutes from './router/account/userRoutes';
import accountRoutes from './router/account/accountRoutes';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);
app.use('/user', userRoutes);
app.use('/', accountRoutes);

const PORT: number = 3000;
const server = app.listen(PORT, () => {
    console.log('Example app listening at http://localhost:%s', PORT);
});

export default app;