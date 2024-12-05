import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, IsStrongPassword, Length, MinLength } from "class-validator"

export class CreateUserDTO {
    
    @ApiProperty({
        description: "Nome do Usuário"
    })
    @IsString()
    @Length(3, 30)
    name : string

    @ApiProperty()
    @IsEmail()
    email : string

    @ApiProperty()
    @IsStrongPassword()
    @MinLength(6)
    password : string
}