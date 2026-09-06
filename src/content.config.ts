import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/pages/posts/` directory.
	loader: glob({ base: './src/pages/posts', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
            layout: z.string().optional(),
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
            author: z.string().optional(),
			image: z.object({
				url: z.string(),
				alt: z.string(),
			}).optional(),
            tags: z.array(z.string()).optional(),
		}),
});

const webLinks = defineCollection({
    // Load Markdown and MDX files in the `src/content/weblinks/` directory.
    loader: glob({ base: './src/content/weblinks', pattern: '**/*.{md,mdx}' }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            url: z.string(),
            linktext: z.string(),
            title: z.string().optional(),
            description: z.string(),
            pubDate: z.coerce.date(),
        }),
});

export const collections = { blog, webLinks };