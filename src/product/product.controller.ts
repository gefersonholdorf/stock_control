import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
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
}