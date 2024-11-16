import dotenv from 'dotenv';
import express from 'express';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
