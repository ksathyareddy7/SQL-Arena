import express from 'express';
import { getExercises, getExerciseById, getMetadata } from '../controllers/exercises.js';
import {
  getExerciseTimer,
  startExerciseTimer,
  pauseExerciseTimer,
  resumeExerciseTimer,
  stopExerciseTimer,
  resetExerciseTimer,
} from "../controllers/exerciseTimers.js";
import { getHints, revealHint } from '../controllers/hints.js';
import { getSolutionsByQuestionId, unlockSolutionsForQuestion } from '../controllers/solutions.js';

const router = express.Router();

router.get('/', getExercises);
router.get('/meta/categories', getMetadata);
router.get('/:id', getExerciseById);
router.get('/:id/timer', getExerciseTimer);
router.post('/:id/timer/start', startExerciseTimer);
router.post('/:id/timer/pause', pauseExerciseTimer);
router.post('/:id/timer/resume', resumeExerciseTimer);
router.post('/:id/timer/stop', stopExerciseTimer);
router.post('/:id/timer/reset', resetExerciseTimer);
router.get('/:id/hints', getHints);
router.post('/:id/hints/:hintId/reveal', revealHint);
router.post('/:id/solutions/unlock', unlockSolutionsForQuestion);
router.get('/:id/solutions', getSolutionsByQuestionId);

export default router;
