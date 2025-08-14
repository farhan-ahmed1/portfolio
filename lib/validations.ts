import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  body: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
