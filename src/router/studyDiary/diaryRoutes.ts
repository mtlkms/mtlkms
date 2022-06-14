import * as express from 'express';
import diaryController from '../../controller/studyDiaryController/diaryController';

const router = express.Router();

// Start learning diary
router.post('/', (req, res) => {
    diaryController.create(req.cookies.token, req.body).then(result => {
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

// Stop learning diary
router.put('/', (req, res) => {
    diaryController.stopLearningDiary(req.cookies.token, req.body).then(result => {
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

// Get learning diary
router.get('/learning', (req, res) => {
    diaryController.getLearningDiary(req.cookies.token).then(result => {
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

// Get diaries per month
router.get('/:user/:year/:month/:sdtag', (req, res) => {
    diaryController.getDiariesPerMonth(
        req.params.sdtag,
        req.params.user,
        req.params.month,
        req.params.year
    ).then(result => {
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

export default router;