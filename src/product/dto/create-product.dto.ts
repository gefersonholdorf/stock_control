import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator"

export class CreateProductDTO {

    @IsString()
    @MinLength(6)
    @MaxLength(40)
    name : string

    @IsString()
    @MaxLength(150)
    description : string

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    stockQuantity : number

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price : number

    @IsNumber()
    @IsNotEmpty()
    supplierId : number
}