import * as express from 'express';
import accountController from './controller/accountController/accountController';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Hello World!');
});

router.post('/account', (req, res, next) => {
    accountController.create(req.body)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(400).send('Error: ' + err);
    });
});

router.put('/account/:username', (req, res, next) => {
    accountController.changeName(req.params.username, req.body)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(400).send('Error: ' + err);
    });
});

export default router;