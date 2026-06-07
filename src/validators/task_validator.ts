import { z } from "zod";

export const CreateTaskSchema = z.object({
    title: z
        .string()
        .min(3, "Task title is required")
        .max(100),

    description: z
        .string()
        .min(5, "Task description is required")
        .max(500),

    projectId: z.string(),

    assignedTo: z.string(),
});

export const UpdateTaskSchema =
    CreateTaskSchema.partial();

export type CreateTaskInput =
    z.infer<typeof CreateTaskSchema>;

export type UpdateTaskInput =
    z.infer<typeof UpdateTaskSchema>;