import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { PaginationPipe } from "src/pipes/pagination.pipe";
import { UpdatePartialUserDTO } from "./dto/update-partial-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "../enum/role.enum";
import { RoleGuard } from "src/guards/role.guard";

@Roles(Role.Admin, Role.User)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService : UserService) {}

    @Post()
    async create(@Body() body : CreateUserDTO) {
        return this.userService.create(body)
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id : number) {
        return this.userService.findById(id)
    }

    @Get()
    @UsePipes(PaginationPipe)
    async findAll(
        @Query() paginationParams : {
            page : number,
            limit : number,
            order : string,
            direction : string
        }
    ) {
        const {page, limit, order, direction} = paginationParams

        return this.userService.findAll(page, limit, order, direction)
    }

    @Patch(':id/disable')
    async inactivate(@Param('id', ParseIntPipe) id : number) {
        return this.userService.disable(id)
    }

    @Patch(':id/activate')
    async activate(@Param('id', ParseIntPipe) id : number) {
        return this.userService.activate(id)
    }

    @Patch(':id') 
    async updatePartial(@Param('id', ParseIntPipe) id : number, @Body() body : UpdatePartialUserDTO) {
        return this.userService.updatePartial(id, body)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id : number, @Body() body : UpdateUserDTO) {
        return this.userService.update(id, body)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id : number) {
        return this.userService.delete(id)
    }
}