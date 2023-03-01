import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import singerRouter from './routes/singerRoutes.js';

// variables
const app = express();
const { PORT, MONGO_URL, FRONT_URL, NODE_ENV } = process.env;
const endpoint = '/api/v1/tms';
const corsOptions = NODE_ENV === 'development' ? {} : { origin: FRONT_URL };

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

//routes
app.use(endpoint, singerRouter);

const startServer = async () => {
  try {
    mongoose.set(`strictQuery`, true);
    mongoose.connect(MONGO_URL);
    console.log('Database is connected...');
    app.listen(PORT, () => {
      if (NODE_ENV === 'development') {
        console.log(`http://localhost:${PORT}`);
        console.log('Server is running...');
      } else {
        console.log('Server is running...');
      }
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
