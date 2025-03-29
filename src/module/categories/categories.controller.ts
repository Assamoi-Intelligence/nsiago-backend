import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.findOne(createCategoryDto.code);
    if (category) throw new ConflictException('Cette catégorie existe déjà');
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':code')
  async findOne(@Param('code') code: string) {
    const category = await this.categoriesService.findOne(code);
    if (!category) throw new NotFoundException(`La catégorie avec le code ${code} est introuvable`);
    return this.categoriesService.findOne(code);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesService.findOneId(id);
    if (!category) throw new NotFoundException(`Cette catégorie est introuvable`);
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoriesService.findOneId(id);
    if (!category) throw new NotFoundException(`Cette catégorie est introuvable`);
    return this.categoriesService.remove(id);
  }
}
