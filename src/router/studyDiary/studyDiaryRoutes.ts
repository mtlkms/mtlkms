import * as express from 'express';
import * as path from 'path';
import SDTagController from '../../controller/studyDiaryController/SDTagController';

const router = express.Router();

// Get all tags
router.get('/', (req, res) => {
    SDTagController.getAll().then(result => {
        res.json({
            success: true,
            data: result
        });
    }).catch(err => {
        res.status(400).json({
            success: false,
            error: err.message
        });
    });
});

// Create tag
router.post('/', (req, res) => {
    SDTagController.create(req.cookies.token, req.body).then(result => {
        res.json({
            success: true,
            result
        });
    }).catch(err => {
        res.status(400).json({
            success: false,
            error: err.message
        });
    });
});

// Update tag
router.put('/', (req, res) => {
    SDTagController.update(req.cookies.token, req.body).then(result => {
        res.json({
            success: true,
            result
        });
    }).catch(err => {
        res.status(400).json({
            success: false,
            error: err.message
        });
    });
});

// Delete tag
router.delete('/', (req, res) => {
    SDTagController.delete(req.cookies.token, req.body.id).then(() => {
        res.json({
            success: true,
        });
    }).catch(err => {
        res.status(400).json({
            success: false,
            error: err.message
        });
    });
});

export default router;