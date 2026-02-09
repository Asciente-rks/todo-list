export interface ToDo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    dueDate?: Date;
    isOverdue?: boolean;
    createdAt: Date;
    updatedAt: Date;
}