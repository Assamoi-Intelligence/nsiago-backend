import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSimulationDto: CreateSimulationDto) {
    return this.simulationsService.create(createSimulationDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.simulationsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':quoteReference')
  async findOne(@Param('quoteReference') quoteReference: string) {
    const simulation = await this.simulationsService.findOne(quoteReference);
    if (!simulation) throw new NotFoundException(`La simulation avec la référence ${quoteReference} est introuvable`);
    return simulation;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSimulationDto: UpdateSimulationDto) {
  //   return this.simulationsService.update(+id, updateSimulationDto);
  // }

  @UseGuards(AuthGuard)
  @Delete(':quoteReference')
  async remove(@Param('quoteReference') quoteReference: string) {
    const simulation = await this.simulationsService.findOne(quoteReference);
    if (!simulation) throw new NotFoundException(`La simulation avec la référence ${quoteReference} est introuvable`);
    return this.simulationsService.remove(quoteReference);
  }
}
