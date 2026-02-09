import express from 'express';
import { todoRouter } from './handlers/todo.routes';


const PORT = 3000;
const app = express();

app.use(express.json());

app.use('/todos', todoRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});