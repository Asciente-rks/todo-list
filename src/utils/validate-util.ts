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
    .optional()
    .default(false),
  dueDate: yup
    .string()
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .nullable()
    .optional()
});

export const userSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: yup
    .string()
    .trim()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export const updateUserSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .optional(),
  email: yup
    .string()
    .trim()
    .email('Invalid email format')
    .optional(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
});

export const validate = async (schema: yup.Schema, data: any) => {
  try {
    const validatedData = await schema.validate(data, { abortEarly: false, stripUnknown: true });
    return { data: validatedData, errors: null };
  } catch (err: any) {
    return {
      data: null,
      errors: err.inner.map((e: any) => ({
        path: e.path,
        message: e.message,
      })),
    };
  }
};