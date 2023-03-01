import express from 'express';
import multer from 'multer';
import path from 'path';

import {
  getAllSingers,
  getSingerById,
  createSinger,
  updateSinger,
  deleteSinger,
} from '../controllers/singerController.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const middlewareUpload = upload.single('image');

const router = express.Router();

router.get('/', getAllSingers);

router.get('/:id', getSingerById);

router.post('/', middlewareUpload, createSinger);

router.put('/:id', updateSinger);

router.delete('/:id', deleteSinger);

export default router;
