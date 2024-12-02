import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor (@InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity>) {}

    async create(body : CreateUserDTO) {

        const user = await this.validateEmail(body.email) 

        if (user) {
            throw new BadRequestException('E-mail já existe no sistema!')
        }

        const { password } = body

        const newPassword = await bcrypt.hash(password, 10)

        const newUser = await this.userRepository.create({
            ...body,
            password: newPassword
        })

        await this.userRepository.save(newUser)

        return {
            status: "Usuário cadastrado com sucesso!",
            user: newUser
        }
    }

    async findAll(page : number, limit : number, orderBy : string = 'name', orderDirection : string = 'ASC') {

        const [users, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                [orderBy]: orderDirection
            }
        })

        return {
            users,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) 
        }
    }


    async validateEmail(email : string) {

        const user = await this.userRepository.findOne({
            where: {email}
        })

        if(!user) {
            return false
        }

        return user
    }
}