import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SimulationsModule } from './module/simulations/simulations.module';
import { SubscriptionsModule } from './module/subscriptions/subscriptions.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [
    SimulationsModule, 
    SubscriptionsModule, 
    PrismaModule, 
    ConfigModule.forRoot({isGlobal: true}), 
    AuthModule, 
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
