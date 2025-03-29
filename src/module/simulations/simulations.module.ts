import { Module } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { SimulationsController } from './simulations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CalculationsService } from 'src/shared/calculation.service';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [PrismaModule],
  controllers: [SimulationsController],
  providers: [SimulationsService, CalculationsService, ProductsService],
})
export class SimulationsModule {}
