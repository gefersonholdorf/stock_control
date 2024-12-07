import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StockMovementEntity } from "./entity/stock-movement.entity";
import { Repository } from "typeorm";
import { CreateStockMovementDTO } from "./dto/create-stock-movement.dto";
import { UserService } from "src/user/user.service";
import { ProductService } from "src/product/product.service";
import { FilterMovementDTO } from "./dto/filter-movement.dto";

@Injectable() 
export class StockMovementService {
    constructor(
        @InjectRepository(StockMovementEntity) private readonly stockMovimentRepository : Repository<StockMovementEntity>,
        private readonly userService : UserService,
        private readonly productService : ProductService
    ){}

    async entry(createStockMovement : CreateStockMovementDTO) {
        const user = await this.userService.findById(createStockMovement.user)
        const product = await this.productService.findById(createStockMovement.product)

        if (createStockMovement.type != "entrada") {
            throw new BadRequestException('Tipo de movimentação não pode ser diferente de Entrada')
        }

        await this.productService.entry(createStockMovement.quantity, product)

        const stockMovement = await this.stockMovimentRepository.create({
            ...createStockMovement,
            product,
            user
        })

        await this.stockMovimentRepository.save(stockMovement)

        return {
            status: "Movimentação de Estoque de Entrada realizada com sucesso",
            stockMovement
        }
    }

    async exit(createStockMovement : CreateStockMovementDTO) {
        const user = await this.userService.findById(createStockMovement.user)
        const product = await this.productService.findById(createStockMovement.product)

        if (createStockMovement.type != "saida") {
            throw new BadRequestException('Tipo de movimentação não pode ser diferente de Saída')
        }

        await this.productService.exit(createStockMovement.quantity, product)

        const stockMovement = await this.stockMovimentRepository.create({
            ...createStockMovement,
            product,
            user
        })

        await this.stockMovimentRepository.save(stockMovement)

        return {
            status: "Movimentação de Estoque de Saída realizada com sucesso",
            stockMovement
        }
    }

    async filterMoviments(filterMoviment : FilterMovementDTO) {

        const actualDate = new Date()
        const actualDateFormated = `${actualDate.getFullYear()}-${String(actualDate.getMonth()+1).padStart(2, '0')}-${String(actualDate.getDay()).padStart(2, '0')}`
        const startDateInit = new Date()
        startDateInit.setDate(startDateInit.getDay() - 30)
        const startDateFormated = `${startDateInit.getFullYear()}-${String(startDateInit.getMonth()+1).padStart(2, '0')}-${String(startDateInit.getDay()).padStart(2, '0')}`

        const stockMovements = await this.stockMovimentRepository.createQueryBuilder('sm')
                    .innerJoin('sm.user', 'user')
                    .innerJoin('sm.product', 'product')
                    .where('user.name LIKE :user', {user: `%${filterMoviment.user}%`})
                    .andWhere('product.name LIKE :product', {product: `%${filterMoviment.product}%`})
                    .andWhere('sm.date BETWEEN :startDate AND :finishDate', {startDate: `${filterMoviment.startDate ?? startDateFormated}`,
                                                                                                finishDate: `${filterMoviment.finishDate ?? actualDateFormated}`})
                    .getMany()

        return stockMovements
    }
}