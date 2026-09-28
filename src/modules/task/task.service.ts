import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service.js";
import { createTaskDto } from "./dto/create-task.dto.js";
import { listTasksQuerydto } from "./dto/list_task.dto.js";
import { updateTaskDto } from "./dto/update-task.dto.js";
import { filter } from "rxjs";
import { ne } from "zod/v4/locales";



@Injectable()
export class taskService {
    constructor (private readonly prisma: PrismaService){}


    create(userId: string, dto: createTaskDto){
        return this.prisma.task.create({data: {...dto, userId }});
    };


    findAll(userId: string, dto: listTasksQuerydto) {
        return this.prisma.task.findMany({
            where: {userId, ...filter},
            orderBy: {createdAt: "desc"},
        });
    }


    async findOne (userId: string, id: number){
        const task = await this.prisma.task.findFirst({where: {id, userId}});
        if(!task) throw new  NotFoundException (`Task ${id} not found`);
        return task;
    }


    async update(userId: string, id: number, dto: updateTaskDto) {
        await this.findOne(userId, id);
        return this.prisma.task.update({where: {id}, data: dto })
    }


    async complete(userId: string, id:number){
        await this.findOne(userId, id)
        return this.prisma.task.update({
            where: {id},
            data: {completed: true,}
        });
    }


    async remove(userId: string, id: number) {
        await this.findOne(userId, id);
        await this.prisma.task.delete({where: {id}})
    }
    

}