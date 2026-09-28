import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { createTaskDto } from "./dto/create-task.dto.js"; 
import { listTasksQuerydto } from "./dto/list_task.dto.js"; 
import { taskService } from "./task.service.js"; 
import { 
     Body, 
     Controller,
     Delete, 
     Get, 
     HttpCode,
     HttpStatus,
     Param, 
     ParseIntPipe, 
     Patch, Post, 
     Put, 
     Query 
} from "@nestjs/common";

import { updateTaskDto } from "./dto/update-task.dto.js";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { UseGuards } from "@nestjs/common";
import { SessionGuard } from "../../common/guards/session.guard.js";



@ApiTags("tasks")
@ApiBearerAuth()
@UseGuards(SessionGuard)
@Controller('tasks')
export class tasksController {
    constructor(private readonly taskService: taskService) {}


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Session() session: UserSession, @Body() dto: createTaskDto) {
        return this.taskService.create(session.user.id, dto)
    }



    @Get()
    @HttpCode(HttpStatus.OK)
	findAll(@Session() session: UserSession, @Query() query: listTasksQuerydto){
        return this.taskService.findAll(session.user.id, query)
    }

	@Get(':id')
    @HttpCode(HttpStatus.OK)
	findOne(
		@Session() session: UserSession,
		@Param('id', ParseIntPipe) id: number,
	) {
		return this.taskService.findOne(session.user.id, id);
	}




    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    complete(
        @Session() session: UserSession, 
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: updateTaskDto
    ){
        return this.taskService.complete(session.user.id, id)
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Session() session: UserSession,
        @Param('id', ParseIntPipe) id: number 
    ){
        return this.taskService.remove(session.user.id, id);
    }

}