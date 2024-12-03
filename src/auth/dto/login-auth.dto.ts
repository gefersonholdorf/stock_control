import { IsString, MinLength } from "class-validator"

export class LoginDTO {
    
    @IsString()
    email : string

    @IsString()
    @MinLength(3)
    password : string
}