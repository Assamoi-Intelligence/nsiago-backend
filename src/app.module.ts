import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SimulationsModule } from './module/simulations/simulations.module';
import { SubscriptionsModule } from './module/subscriptions/subscriptions.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SimulationsModule, 
    SubscriptionsModule, 
    PrismaModule, 
    ConfigModule.forRoot({isGlobal: true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
