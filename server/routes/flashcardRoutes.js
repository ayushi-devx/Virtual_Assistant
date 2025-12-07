const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createDeck,
  getUserDecks,
  getDeckById,
  addFlashcard,
  updateFlashcard,
  deleteFlashcard,
  updateDeck,
  deleteDeck,
  getPublicDecks,
} = require('../controllers/flashcardController');

const router = express.Router();

router.use(protect);

router.post('/', createDeck);

router.get('/', getUserDecks);

router.get('/public/browse', getPublicDecks);

router.get('/:id', getDeckById);

router.put('/:id', updateDeck);

router.delete('/:id', deleteDeck);

router.post('/:id/card', addFlashcard);

router.put('/:deckId/card/:cardId', updateFlashcard);

router.delete('/:deckId/card/:cardId', deleteFlashcard);

module.exports = router;
