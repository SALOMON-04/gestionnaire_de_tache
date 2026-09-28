import { Controller, Module } from "@nestjs/common";
import { tasksController } from "./task.controller.js";
import { taskService } from "./task.service.js";




@Module({
    controllers:[tasksController],
    providers:[taskService]
})

export class TasksModule {}