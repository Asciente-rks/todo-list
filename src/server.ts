import express from 'express';
import dotenv from 'dotenv';
import { sequelize, testConnection } from './utils/db';
import { User } from './models/user/user.sequelize';
import { Todo } from './models/todo/todo.sequelize';
import { todoRouter } from './routes/todo.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/todos', todoRouter);

const startServer = async () => {
  try {
    await testConnection();
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();