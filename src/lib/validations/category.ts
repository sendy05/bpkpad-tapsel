import { z } from 'zod';

export const CategorySchema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
});

export type CategoryInput = z.infer<typeof CategorySchema>;

