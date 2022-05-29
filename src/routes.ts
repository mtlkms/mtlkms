import * as express from 'express';
import account from './account/account';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Hello World!');
});

router.post('/account', (req, res, next) => {
    account.create([req.body.name, req.body.email, req.body.username, req.body.password])
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
    });
});

export default router;