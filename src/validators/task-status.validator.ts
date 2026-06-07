import { z } from "zod";

export const UpdateTaskStatusSchema =
    z.object({
        status: z.enum([
            "TODO",
            "IN_PROGRESS",
            "DONE",
        ]),
    });