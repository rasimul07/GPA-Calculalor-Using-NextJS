import * as Yup from 'yup';

export const contactSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  subject: Yup.string()
    .trim()
    .min(3, 'Subject must be at least 3 characters')
    .max(150, 'Subject is too long')
    .required('Subject is required'),
  message: Yup.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long')
    .required('Message is required'),
});
