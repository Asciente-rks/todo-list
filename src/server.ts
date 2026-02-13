import express from 'express';
import dotenv from 'dotenv';
import { todoSequelize, userSequelize, testConnection } from './utils/db';
import { userRouter } from './routes/users/user.routes';
import { todoRouter } from './routes/todo/todo.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/todos', todoRouter);
app.use('/users', userRouter);

const startServer = async () => {
  try {
    await testConnection();
    await todoSequelize.sync();
    await userSequelize.sync();
    console.log('Databases synced successfully.');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();