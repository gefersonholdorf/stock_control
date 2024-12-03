import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PaginationPipe implements PipeTransform {

    transform(value: any) {
        
        const page : number = parseInt(value.page, 10)
        const limit : number = parseInt(value.limit, 10)
        const order : string = value.order
        const direction : string = value.direction

        if (isNaN(page) || page <= 0) {
            throw new BadRequestException("A página deve ser um número positivo")
        }

        if (isNaN(limit) || limit <= 0 || limit >= 100) {
            throw new BadRequestException("O limite deve ser número positivo e não deve ser maior que 100")
        }

        return {page, limit, order, direction}
    }

}