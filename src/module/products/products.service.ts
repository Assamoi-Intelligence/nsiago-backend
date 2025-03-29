import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({data: createProductDto});
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(code: string) {
    return this.prisma.product.findFirst({where: {code: code}});
  }

  update(code: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({where: {code}, data: updateProductDto});
  }

  remove(code: string) {
    return this.prisma.product.delete({where: {code}});
  }
}
