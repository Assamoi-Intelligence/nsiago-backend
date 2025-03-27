import { Controller, Get, Post } from '@nestjs/common';

@Controller('simulations')
export class SimulationsController {

    @Post()
    create() {

    }

    @Get()
    findAll() {
    }

    @Get(':id')
    findOne() {

    }

    
}
