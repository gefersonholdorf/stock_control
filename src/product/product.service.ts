import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entity/product.entity";
import { Repository } from "typeorm";
import { CreateProductDTO } from "./dto/create-product.dto";
import { SupplierService } from "src/supplier/supplier.service";
import { SupplierEntity } from "src/supplier/entity/supplier.entity";

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository : Repository<ProductEntity>,
        private readonly supplierService : SupplierService
    ) {}

    async create(createProductDTO : CreateProductDTO) {

        const supplier = await this.supplierService.findById(createProductDTO.supplierId)

        const product = await this.productRepository.create({
            ...createProductDTO,
            supplier
        })

        await this.productRepository.save(product)

        return {
            status: "Produto criado com sucesso",
            product
        }
    }

    async findBySupplier(supplier : SupplierEntity) {
        return this.productRepository.findBy({
            supplier
        })
    }

    async findById(id : number) {
        const product = await this.productRepository.findOne({where: {id}})

        if (!product) {
            throw new NotFoundException('Produto não encontrado!')
        }

        return product
    }

    async entry(quantity : number, product : ProductEntity) {
        const quantityProducts = product.stockQuantity
        console.log(quantityProducts)

        product.stockQuantity += quantity
        console.log(product.stockQuantity)

        await this.productRepository.save(product)
    }

    async exit(quantity : number, product : ProductEntity) {
        const quantityProducts = product.stockQuantity
        console.log(quantityProducts)

        if (quantityProducts - quantity < 1) {
            throw new BadRequestException('Quantidade de produtos não pode ser menor que 1')
        }

        product.stockQuantity -= quantity
        console.log(product.stockQuantity)

        await this.productRepository.save(product)
    }

}