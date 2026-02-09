import { ToDoRepository } from '../../repositories/todo/todo.repository';
import { ToDo } from '../../models/todo/todo.model';
import { CreateToDoDTO } from '../../dtos/todo/create-todo.dto';
import { UpdateToDoDTO } from '../../dtos/todo/update-todo.dto';

export class TodoService {
    constructor(private todoRepository: ToDoRepository) {}

    getAllTodos() {
        const allTodos = this.todoRepository.findAll();
        return allTodos.map(todo => ({
            ...todo,
            isOverdue: todo.dueDate ? todo.dueDate < new Date() : false
        }));
    }

    getTodoById(id: string): ToDo {
        const todo = this.todoRepository.findById(id);
        if (!todo) throw new Error("Todo not found");

        todo.isOverdue = todo.dueDate ? todo.dueDate < new Date() : false;
        return todo;
    }

    createTodo(dto: CreateToDoDTO): ToDo {
        const currentDate = new Date();
        const todo: ToDo = {
            id: crypto.randomUUID(),
            title: dto.title,
            description: dto.description,
            completed: dto.completed,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            createdAt: currentDate,
            updatedAt: currentDate,
            isOverdue: dto.dueDate ? new Date(dto.dueDate) < new Date() : false
        };

        return this.todoRepository.createToDo(todo);
    }
    
    updateTodo(id: string, update: Partial<UpdateToDoDTO>): ToDo {
        const { dueDate, ...remaining } = update;
        const updateData: Partial<ToDo> = { ...remaining};
    
        if (dueDate === null || dueDate === "") {
            updateData.dueDate = undefined;
        } else if (dueDate) {
            updateData.dueDate = new Date(dueDate);
        }
    
        updateData.updatedAt = new Date();
    
        const updated = this.todoRepository.updateById(id, updateData);
        if (!updated) throw new Error(`Todo with id ${id} not found`);

        updated.isOverdue = updated.dueDate ? updated.dueDate < new Date() : false;
    
        return updated;
    }
    
    deleteTodo(id: string): boolean {
        const success = this.todoRepository.deleteById(id);
        if (!success) throw new Error("Todo not found");
        return success;
    }
}
