import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entity/product.entity";
import { Repository } from "typeorm";
import { CreateProductDTO } from "./dto/create-product.dto";
import { SupplierService } from "src/supplier/supplier.service";
import { SupplierEntity } from "src/supplier/entity/supplier.entity";
import { join } from "path";
import * as fs from "fs";
import { StatusProduct } from "src/enum/status-product.enum";

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

        if (quantityProducts - quantity < 0) {
            throw new BadRequestException('Quantidade de produtos não pode ser menor que 0')
        }

        product.stockQuantity -= quantity
        console.log(product.stockQuantity)

        await this.productRepository.save(product)
    }

    async findAll() {
        const products = await this.productRepository.find()

        const path = join(__dirname, '..', '..', 'config.json')
        let config

        try {
            config = JSON.parse(fs.readFileSync(path, "utf-8"))
        } catch (error) {
            throw new BadRequestException('Erro ao acessar arquivo de configuração!')
        }

        const productsStatus : any = []

        for (let product of products) {
            const totalPrice = product.price * product.stockQuantity

            if (product.stockQuantity == 0) {
                productsStatus.push({
                    ...product,
                    status: StatusProduct.Indisponível,
                    totalPrice
                })
            }

            if (product.stockQuantity > 0 && product.stockQuantity <= config.limiteMinimoEstoque) {
                productsStatus.push({
                    ...product,
                    status: StatusProduct.BaixoEstoque,
                    totalPrice
                 })
            }

            if (product.stockQuantity > config.limiteMinimoEstoque) {
                productsStatus.push({
                    ...product,
                    status: StatusProduct.Disponível,
                    totalPrice
                 })
            }
        }
        return {
            productsStatus
        }
    }

}