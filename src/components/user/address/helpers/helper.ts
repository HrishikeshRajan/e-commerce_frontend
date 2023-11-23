import { ZodError, z } from 'zod';

export const AddressSchema = z.object({
  fullname: z.string().min(2),
  city: z.string().min(2),
  homeAddress: z.string().min(5),
  state: z.string().min(2),
  postalCode: z.string().length(6),
  phoneNo: z.string().min(7),
  country: z.string().min(2),
});

export const transformZodToFormikErrors = (zodError: ZodError<any>): { [key: string]: string } => {
  const formikErrors: { [key: string]: string } = {};
  zodError.errors.forEach((error: { path: any[]; message: string; }) => {
    if (error.path) {
      const path = error.path.join('.');
      formikErrors[path] = error.message;
    }
  });

  return formikErrors;
};
