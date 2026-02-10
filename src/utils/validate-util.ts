import * as yup from 'yup';

export const todoSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(1, 'Title cannot be empty')
    .required('Title is required'),
  description: yup
    .string()
    .trim()
    .optional(),
  completed: yup
    .boolean()
    .defined('Status is required'),
  dueDate: yup
    .string()
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .nullable()
    .optional()
});

export const validateTodo = async (data: any) => {
  try {
    const validatedData = await todoSchema.validate(data, { abortEarly: false, stripUnknown: true });
    Object.assign(data, validatedData);
    return [];
  } catch (err: any) {
    return err.inner.map((e: any) => ({
      path: e.path,
      message: e.message,
    }));
  }
};