import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';
import { CalculationsService } from 'src/shared/calculation.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class SimulationsService {

  constructor(
    private calculationService: CalculationsService,
    private productService: ProductsService,
    private prisma: PrismaService
  ) {}

  async create(createSimulationDto: CreateSimulationDto) {
    const {
      productCode, 
      vehicleCategoryCode, 
      circulationDate,
      power,
      valueNew,
      userId,
      valueVenal
    } = createSimulationDto;
    const product = await this.getProduct(productCode, vehicleCategoryCode);
    this.calculationService.validateGuarantees(circulationDate, product.guarantees);
    const price = this.calculationService.getPrime({
      power, 
      valueNew, 
      valueVenal, 
      garantees: product.guarantees
    });

    return this.prisma.simulation.create({data: {
      quoteReference: `QT-${Math.random().toString(36).slice(2, 14)}`,
      valueVenal, valueNew, price,
      endDate: new Date(Date.now() + 12096e5),
      userId, productCode, circulationDate
    }});
  }

  findAll() {
    return this.prisma.simulation.findMany();
  }

  findOne(quoteReference: string) {
    return this.prisma.simulation.findUnique({where: {quoteReference}});
  }

  findOneById(id: string) {
    return this.prisma.simulation.findUnique({where: {id}});
  }

  update(id: number, updateSimulationDto: UpdateSimulationDto) {
    return `This action updates a #${id} simulation`;
  }

  remove(quoteReference: string) {
    return this.prisma.simulation.findUnique({where: {quoteReference}});
  }

  private async getProduct(productCode: string, vehicleCategoryCode: string) {
    const product = await this.productService.findOne(productCode);
    if (!product) throw new NotFoundException(`Le produit avec le code ${productCode} est introuvable`);
    if(product && product.categories.includes(vehicleCategoryCode)) {
      throw new Error('Produit non éligible pour cette catégorie de véhicule');
    }
    return product;
  }
}
