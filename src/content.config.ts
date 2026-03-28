import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Fecha de la excursión a la que pertenece el tema
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// Categoría: 'historia', 'logistica', 'tecnico', etc.
		category: z.string().default('general'),
		// Para marcar temas como "Lectura Obligatoria"
		isUrgent: z.boolean().default(false),
	}),
});

export const collections = { 'blog': blog };