import { z } from 'zod';

export const NewsSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    categoryId: z.string().min(1),
    content: z.string().min(10),
    excerpt: z.string().max(300).optional().or(z.literal('')),
    featuredImage: z.string().url().optional().or(z.literal('')),
    status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});

export type NewsInput = z.infer<typeof NewsSchema>;

