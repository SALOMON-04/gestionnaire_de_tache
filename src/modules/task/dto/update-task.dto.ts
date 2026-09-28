import { createZodDto } from "nestjs-zod";
import {z} from "zod";
import { prioritySchema } from "./create-task.dto.js";


export class updateTaskDto extends createZodDto (
    z.object({
        title: z.string().trim().min(1),
		description: z.string().optional(),
        priority: prioritySchema,
        completed: z.boolean().optional(),
    }),
){}