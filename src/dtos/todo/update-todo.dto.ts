export interface UpdateTodoDTO {
    title?: string;
    description?: string;
    completed?: boolean;
    dueDate?: string | null;
}