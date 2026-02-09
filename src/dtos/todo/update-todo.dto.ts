export interface UpdateToDoDTO {
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: string;
}