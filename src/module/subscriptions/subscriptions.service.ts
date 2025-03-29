import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SimulationsService } from '../simulations/simulations.service';

@Injectable()
export class SubscriptionsService {

  constructor(
    private prisma: PrismaService
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const { simulationId } = createSubscriptionDto;
    const {circulationDate} = await this.getSimulation(simulationId);
    return this.prisma.subscription.create({data: {...createSubscriptionDto, circulationDate} });
  }

  findAll() {
    return this.prisma.subscription.findMany();
  }

  findOne(id: string) {
    return this.prisma.subscription.findUnique({where: {id}});
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: string) {
    return this.prisma.subscription.delete({where: {id}});
  }

  async getSimulation(id: string) {
    const simulation = await this.prisma.simulation.findUnique({where: {id}});
    if (!simulation) throw new NotFoundException(`La simulation ${id} est introuvable`);
    return simulation;
  }
}
