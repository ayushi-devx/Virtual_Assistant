const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  saveBotResponse,
  getSavedAnswers,
  getSavedAnswerById,
  updateSavedAnswer,
  deleteSavedAnswer,
  getCategories,
} = require('../controllers/savedAnswerController');

const router = express.Router();

router.use(protect);

router.post('/', saveBotResponse);

router.get('/', getSavedAnswers);

router.get('/categories', getCategories);

router.get('/:id', getSavedAnswerById);

router.put('/:id', updateSavedAnswer);

router.delete('/:id', deleteSavedAnswer);

module.exports = router;
