import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateSupplierDTO } from "./dto/create-supplier.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierEntity } from "./entity/supplier.entity";
import { Repository } from "typeorm";
import { ProductService } from "src/product/product.service";

@Injectable() 
export class SupplierService {

    constructor(
        @InjectRepository(SupplierEntity) private readonly supplierRepository : Repository<SupplierEntity>,
        @Inject(forwardRef(() => ProductService)) private readonly productService : ProductService
    ) {}

    async create(createSupplierDTO : CreateSupplierDTO) {
        const supplier = await this.supplierRepository.create({
            ...createSupplierDTO
        })

        await this.supplierRepository.save(supplier)

        return {
            status: "Fornecedor criado com sucesso!",
            supplier
        }
    }

    async findById(id : number) {
        const supplier = await this.supplierRepository.findOne({
            where: {
                id
            }
        })

        if (!supplier) {
            throw new NotFoundException('Fornecedor não encontrado!')
        }

        return supplier
    }

    async getProducts(id : number) {
        const supplier = await this.findById(id)

        const products = await this.productService.findBySupplier(supplier)

        if (products.length <= 0) {
            return {
                message: "Esse fornecedor não possui produtos!"
            }
        }

        return products
    }
}