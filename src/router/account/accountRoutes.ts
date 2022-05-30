import * as express from 'express';
import accountController from '../../controller/accountController/accountController';

const router = express.Router();

// Create a new account
router.post('/register', (req, res, next) => {
    accountController.create(req.body)
    .then(token => {
        res.cookie('token', token, {
            httpOnly: true,
        })
        .json({
            success: true
        });
    })
    .catch(err => {
        res.status(400).json({
            success: false,
            error: err.message
        });
    });
});

// Login
router.post('/login', (req, res, next) => {
    accountController.login(req.body)
    .then(token => {
        res.cookie('token', token, {
            httpOnly: true,
        })
        .json({
            success: true
        });
    })
    .catch(err => {
        res.status(400).json({
            success: false,
            error: err.message
        });
    });
});

export default router;