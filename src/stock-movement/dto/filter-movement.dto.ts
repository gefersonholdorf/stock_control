import { IsDateString, IsOptional, IsString, MinLength } from "class-validator"

export class FilterMovementDTO{

    @IsOptional()
    @IsString()
    @MinLength(3)
    product ?: string

    @IsOptional()
    @IsDateString()
    startDate ?: Date

    @IsOptional()
    @IsDateString()
    finishDate ?: Date

    @IsOptional()
    @IsString()
    @MinLength(3)
    user ?: string
}