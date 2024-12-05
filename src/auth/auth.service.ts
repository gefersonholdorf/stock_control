import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { LoginDTO } from "./dto/login-auth.dto";
import { UserEntity } from "src/user/entity/user.entity";

@Injectable()
export class AuthService{
    constructor(
        private readonly userService : UserService,
        private readonly jwtService : JwtService
    ) {}

    async login(body : LoginDTO) {

        const user = await this.userService.login(body.email, body.password)

        const token = await this.createToken(user)

        return {
            token
        }
    }

    async createToken(user : UserEntity) {
        return this.jwtService.sign(
            {
                sub: user.id,      // ID do usuário
                name: user.name,   // Nome do usuário
                email: user.email, // Email do usuário
                role: user.role    // Papel do usuário
            },
            {
                secret: process.env.JWT_SECRET, // Chave secreta do JWT
                issuer: 'api',                  // Quem emite o token
                audience: 'users',              // Quem é o público do token
                expiresIn: '1h'                 // Expiração do token
            }
        );
    }

    async checkToken(token : string) {
        try {
            const data = await this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
                issuer: 'api',
                audience: 'users'
            })

            return data
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}