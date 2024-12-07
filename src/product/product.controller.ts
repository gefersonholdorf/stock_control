import { Body, Controller, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Get } from "@nestjs/common";
import { CreateProductDTO } from "./dto/create-product.dto";
import { ProductService } from "./product.service";

@UsePipes(new ValidationPipe())
@Controller('products')
export class ProductController {

    constructor(private readonly productService : ProductService) {}

    @Post()
    async create (@Body() createProductDTO : CreateProductDTO) {
        return this.productService.create(createProductDTO)
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id : number) {
        return this.productService.findById(id)
    }

    @Get()
    async findAll() {
        return this.productService.findAll()
    }
}