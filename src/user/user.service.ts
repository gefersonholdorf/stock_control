import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UpdatePartialUserDTO } from "./dto/update-partial-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

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

        console.log(orderBy, orderDirection)

        const [users, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                [orderBy]: orderDirection
            }
        })

        if (users.length <= 0) {
            throw new BadRequestException('Não existe usuários nesta página!')
        }

        return {
            users,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) 
        }
    }

    async disable(id : number) {
        const user = await this.findById(id)

        user.isActive = 0

        await this.userRepository.save(user)

        return {
            status: "Usuário inativado com sucesso",
            user: user
        }
    }

    async activate(id : number) {
        const user = await this.findById(id)

        user.isActive = 1

        await this.userRepository.save(user)

        return {
            status: "Usuário ativado com sucesso",
            user: user
        }
    }

    async updatePartial(id : number, body : UpdatePartialUserDTO) {
        const user = await this.findById(id)

        if (body.email) {
            const userEmail = await this.validateEmail(body.email)

            if (userEmail){throw new BadRequestException('E-mail já existe no sistema')}
        }

        let newPassword

        if (body.password) {
            newPassword = await bcrypt.hash(body.password, 10)
        }

       await this.userRepository.update(user.id, {
        ...body,
        password: newPassword
       })

       const updateUser = await this.findById(id)

        return {
            status: "Usuário alterado com sucesso",
            user: updateUser
        }
    }

    async update(id : number, body : UpdateUserDTO) {
        const user = await this.findById(id)

        if (user.email != body.email) {
            const userEmail = await this.validateEmail(body.email)

            if (userEmail) {throw new BadRequestException('Email já existente!')}        
        }
        let newPassword

        if (body.password) {
            newPassword = await bcrypt.hash(body.password, 10)
        }

        await this.userRepository.update(
            id, {
                ...body,
                password: newPassword
            })

        const newUser = await this.findById(user.id)
        
        return {
            status: "Usuário atualizado com sucesso!",
            user: newUser
        } 
    }

    async delete(id : number) {
        const user = await this.findById(id)

        await this.userRepository.delete(user)

        return {
            status: "Usuário deletado com sucesso"
        }
    }

    async findById(id : number) {
        const user = await this.userRepository.findOne({
            where: {id}
        })

        if (!user) {throw new NotFoundException('Usuário não encontrado!')}

        return user
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

    async login(email : string, password : string) {
        const user = await this.validateEmail(email)

        if (!user) {
            throw new BadRequestException('Email não existente!')
        }
        
        const currentUser : UserEntity = await this.userRepository.findOne({
            where: {
               email 
            },
            select: {
                id: true,
                email: true,
                role: true,
                password: true
            }
        })

        if (user){
            if(!await bcrypt.compare(password, currentUser.password)) {
                throw new UnauthorizedException('Senha incorreta!')
            }
        }

        return currentUser
    }
}
