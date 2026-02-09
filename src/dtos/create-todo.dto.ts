export interface CreateToDoDTO {
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: string;
}