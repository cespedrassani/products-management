import { z } from 'zod';

export const productFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'O título é obrigatório' })
    .max(30, { message: 'O título não pode ter mais de 30 caracteres' }),

  price: z
    .number({ invalid_type_error: 'O preço deve ser um número' })
    .positive({ message: 'O preço deve ser maior que zero' }),

  description: z
    .string()
    .min(1, { message: 'A descrição é obrigatória' }),

  category: z
    .string()
    .min(1, { message: 'A categoria é obrigatória' }),

  image: z
    .string()
    .url({ message: 'A URL da imagem deve ser válida' })
    .min(1, { message: 'A URL da imagem é obrigatória' }),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;