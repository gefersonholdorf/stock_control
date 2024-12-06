import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class CreateSupplierDTO {

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name : string

    @IsEmail()
    email : string

    @IsString()
    @MinLength(9)
    @MaxLength(11)
    phone : string
}