
import dotenv from 'dotenv';
import connectDB from './db/db.js';

dotenv.config();

connectDB();





/*
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
const app = express(); 

;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log('Connected to MongoDB');
    app.on('error', (err) => {
      console.error('Error occurred:', err);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();
*/