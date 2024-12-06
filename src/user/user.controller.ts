import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { PaginationPipe } from "src/pipes/pagination.pipe";
import { UpdatePartialUserDTO } from "./dto/update-partial-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "../enum/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { writeFile } from "fs/promises";
import { join } from "path";
import { FileService } from "src/file/file.service";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {

    constructor(
        private readonly userService : UserService,
        private readonly fileService : FileService
    ) {}

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

    @Post('photo')
    @UseInterceptors(FileInterceptor('file'))
    async photo(@Req() req, @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({fileType: "image/png"}),
            new MaxFileSizeValidator({maxSize: 50000})
        ]
    })) file : Express.Multer.File){
        const path = (join(__dirname, '..', '..', 'storage', 'photos', `user-${req.user.id}.png`))

        try {
            await this.fileService.upload(file, path)
            const nameFile = `user-${req.user.id}.png`
            await this.userService.upload(req.user.id, nameFile)

            return {
                status: "Upload realizado com suceso!"
            }
        } catch (error) {
            throw new BadRequestException('Erro ao realizar upload!')
        }
    }
}