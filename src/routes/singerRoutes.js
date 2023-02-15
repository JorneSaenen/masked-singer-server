import express from 'express';
import {
  getAllSingers,
  getSingerById,
  createSinger,
  updateSinger,
  deleteSinger,
} from '../controllers/singerController.js';

const router = express.Router();

router.get('/', getAllSingers);

router.get('/:id', getSingerById);

router.post('/', createSinger);

router.put('/:id', updateSinger);

router.delete('/:id', deleteSinger);

export default router;
