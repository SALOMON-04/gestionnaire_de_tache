import { createZodDto } from "nestjs-zod";
import {z} from "zod";
import { prioritySchema } from "./create-task.dto.js";


export class listTasksQuerydto extends  createZodDto (
    z.object({
		completed: z
			.enum(['true', 'false'])
			.transform((v) => v === 'true')
			.optional(),
		priority: prioritySchema.optional(),
	}),
){}
