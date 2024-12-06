import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateSupplierDTO } from "./dto/create-supplier.dto";
import { SupplierService } from "./supplier.service";

@UsePipes(new ValidationPipe())
@Controller('suppliers')
export class SupplierController{

    constructor(private readonly supplierService : SupplierService) {}

    @Post()
    async create(@Body() createSupplierDTO : CreateSupplierDTO) {
        return this.supplierService.create(createSupplierDTO)
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id : number) {
        return this.supplierService.findById(id)
    }

    @Get(':id/products')
    async getProducts(@Param('id', ParseIntPipe) id : number) {
        return this.supplierService.getProducts(id)
    }
}