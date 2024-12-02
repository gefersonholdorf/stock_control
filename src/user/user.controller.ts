import { Body, Controller, Get, Post, Query, UsePipes } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { PaginationPipe } from "src/pipes/pagination.pipe";

@Controller('users')
export class UserController {

    constructor(private readonly userService : UserService) {}

    @Post()
    async create(@Body() body : CreateUserDTO) {
        return this.userService.create(body)
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
}