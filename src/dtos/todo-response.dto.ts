export interface ResponseToDoDTO {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: string;
    isOverdue?: boolean;
}