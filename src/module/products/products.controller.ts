import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':code')
  async findOne(@Param('code') code: string) {
    const product = await this.productsService.findOne(code);
    if (!product) throw new NotFoundException(`Le produit avec le code ${code} est introuvable`);
    return product;
  }

  @Patch(':code')
  async update(@Param('code') code: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productsService.findOne(code);
    if (!product) throw new NotFoundException(`Le produit avec le code ${code} est introuvable`);
    return this.productsService.update(code, updateProductDto);
  }

  @Delete(':code')
  async remove(@Param('code') code: string) {
    const product = await this.productsService.findOne(code);
    if (!product) throw new NotFoundException(`Le produit avec le code ${code} est introuvable`);
    return this.productsService.remove(code);
  }
}
