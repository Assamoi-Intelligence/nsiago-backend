import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { SimulationsModule } from './module/simulations/simulations.module';
import { SubscriptionsModule } from './module/subscriptions/subscriptions.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SimulationsModule, SubscriptionsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
