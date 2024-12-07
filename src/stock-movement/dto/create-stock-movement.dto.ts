import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"
import { TypeMovement } from "src/enum/type-movement.enum"

export class CreateStockMovementDTO {

    @IsNumber()
    product : number

    @IsString()
    @IsEnum(TypeMovement)
    type : TypeMovement

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    quantity : number

    @IsDateString()
    date : Date

    @IsNumber()
    user : number
}