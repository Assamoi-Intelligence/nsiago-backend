import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, NotFoundException, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.findOne(createCategoryDto.code);
    if (category) throw new ConflictException('Cette catégorie existe déjà');
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':code')
  async findOne(@Param('code') code: string) {
    const category = await this.categoriesService.findOne(code);
    if (!category) throw new NotFoundException(`La catégorie avec le code ${code} est introuvable`);
    return this.categoriesService.findOne(code);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesService.findOneId(id);
    if (!category) throw new NotFoundException(`Cette catégorie est introuvable`);
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoriesService.findOneId(id);
    if (!category) throw new NotFoundException(`Cette catégorie est introuvable`);
    return this.categoriesService.remove(id);
  }
}
