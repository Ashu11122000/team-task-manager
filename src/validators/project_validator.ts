import { z } from "zod";

export const CreateProjectSchema = z.object({
    name: z
        .string()
        .min(3, "Project name is required")
        .max(100, "Project name is too long"),

    description: z
        .string()
        .min(5, "Description is required")
        .max(500, "Description is too long"),
    });

export const UpdateProjectSchema =
    CreateProjectSchema.partial();

export type CreateProjectInput =
    z.infer<typeof CreateProjectSchema>;

export type UpdateProjectInput =
    z.infer<typeof UpdateProjectSchema>;