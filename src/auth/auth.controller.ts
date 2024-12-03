import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login-auth.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService : AuthService) {}

    @Post('login')
    async login(@Body() body : LoginDTO) {
        return this.authService.login(body)
    }

    @Post('check')
    async check(@Body() body : any) {
        return this.authService.checkToken(body.token)
    }
}