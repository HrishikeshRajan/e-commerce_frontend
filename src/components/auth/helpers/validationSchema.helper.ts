import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(4).email(),
  password: z.string(),
});

export const emailSchema = z.object({
  email: z.string().min(4).email(),
});

export const passwordSchema = z.object({
  password: z.string(),
});

export const registerSchema = z.object({
  fullname: z.string().min(1).max(18).refine((value) => {
    const parts = value.split(' ');
    if (parts.length >= 2) {
      // Check if all parts contain only alphabetic characters
      // (allowing spaces or hyphens for compound names)
      return parts
        .every((part) => /^[a-zA-Z]+(?:-[a-zA-Z]+)?(?: [a-zA-Z]+(?:-[a-zA-Z]+)?)?$/.test(part));
    }
    return false;
  }, {
    message: 'Please provide both first and last names.',
  }),
  email: z.string().email().trim()
    .min(1),
  password: z.string().refine((value) => {
    // Regular expressions for password validation criteria
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);

    return (
      hasUpperCase
        && hasLowerCase
        && hasNumber
        && hasSpecialChar
    );
  }, {
    message: 'Try some strong password',
  }),
});
