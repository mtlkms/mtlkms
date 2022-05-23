import * as express from 'express';
import account from './account/account';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Hello World!');
});

router.post('/account', (req, res, next) => {
    account.create(req.data);
});

export default router;