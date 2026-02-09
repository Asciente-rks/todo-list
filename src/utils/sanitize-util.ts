export const sanitizeTodo = (data: any) => ({
  title: data.title?.trim(),
  description: data.description?.trim(),
  completed: Boolean(data.completed === true),
  dueDate: data.dueDate?.trim() || null
});