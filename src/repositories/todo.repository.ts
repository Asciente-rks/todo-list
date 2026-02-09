import { ToDo } from '../models/todo.model'

export class ToDoRepository {
    private todoList: ToDo [] = [];

    findAll(): ToDo[] {
        return this.todoList;
    }

    findById(id: string): ToDo | null {
        return this.todoList.find(t => t.id === id) || null;
    }
    
    createToDo(todo: ToDo): ToDo {
        this.todoList.push(todo);
        return todo;
    }

    updateById(id: string, fieldToUpdate: Partial<ToDo>): ToDo | null {
        const todoToUpdate = this.todoList.find(t => t.id === id);
        if (!todoToUpdate) return null;

        Object.assign(todoToUpdate, fieldToUpdate);
        return todoToUpdate;
    }

    deleteById(id: string): boolean {
        const index = this.todoList.findIndex(t => t.id === id);
        if (index === -1) return false;

        this.todoList.splice(index, 1);
        return true;
    }
}