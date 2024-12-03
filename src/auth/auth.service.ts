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
            token,
            user
        }
    }

    async createToken(user) {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email
        }, {
            secret: process.env.JWT_SECRET,
            issuer: 'api',
            audience: 'users'
        })
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