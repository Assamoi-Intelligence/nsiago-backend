import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { SimulationsService } from '../simulations/simulations.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CalculationsService } from 'src/shared/calculation.service';
import { ProductsService } from '../products/products.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, JwtService],
})
export class SubscriptionsModule {}
