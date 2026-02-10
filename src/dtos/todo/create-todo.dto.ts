export interface CreateTodoDTO {
    title: string;
    description?: string;
    completed?: boolean;
    dueDate?: Date | null;
    userId: string;
  }