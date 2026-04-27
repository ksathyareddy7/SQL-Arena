import express from 'express';
import { getExercises, getExerciseById, getMetadata } from '../controllers/exercises.js';
import { getHints, revealHint } from '../controllers/hints.js';
import { getSolutionsByQuestionId, unlockSolutionsForQuestion } from '../controllers/solutions.js';

const router = express.Router();

router.get('/', getExercises);
router.get('/meta/categories', getMetadata);
router.get('/:id', getExerciseById);
router.get('/:id/hints', getHints);
router.post('/:id/hints/:hintId/reveal', revealHint);
router.post('/:id/solutions/unlock', unlockSolutionsForQuestion);
router.get('/:id/solutions', getSolutionsByQuestionId);

export default router;
