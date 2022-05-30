// Router for /account

import * as express from 'express';
import accountController from '../../controller/accountController/accountController';

const router = express.Router();

router.post('/', (req, res, next) => {
    accountController.create(req.body)
    .then(result => {
        res.send(String(result));
    })
    .catch(err => {
        res.status(400).send(String(err));
    });
});

router.put('/:username', (req, res, next) => {
    accountController.changeName(req.params.username, req.body)
    .then(result => {
        res.send(String(result));
    })
    .catch(err => {
        res.status(400).send(String(err));
    });
});

router.put('/:username/password', (req, res, next) => {
    accountController.changePassword(req.params.username, req.body)
    .then(result => {
        res.send(String(result));
    })
    .catch(err => {
        res.status(400).send(String(err));
    });
});

export default router;