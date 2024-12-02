import { IsEmail, IsString, IsStrongPassword, Length, MinLength } from "class-validator"

export class CreateUserDTO {
    
    @IsString()
    @Length(3, 30)
    name : string

    @IsEmail()
    email : string

    @IsStrongPassword()
    @MinLength(6)
    password : string
}