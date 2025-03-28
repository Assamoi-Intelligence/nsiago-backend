import { Injectable } from '@nestjs/common';
import { Vehicle } from '@prisma/client';

@Injectable()
export class CalculationsService {

    private rates = [
        { max: 2, value: 37601 },
        { max: 6, value: 45181 },
        { max: 10, value: 51078 },
        { max: 14, value: 65677 },
        { max: 23, value: 86456 },
        { max: Infinity, value: 104143 }
    ];

    // calculateRC(power: number): number {
    //     return this.rates.find(r => power <= r.max).value;
    // }

    // calculateGarantie(garantie: string, vehicle: Vehicle): number {
    //     switch(garantie) {
    //     case 'DOMMAGE':
    //         return vehicle.valueNew * 0.026;
    //     case 'TIERCE_COLLISION':
    //         return vehicle.valueNew * 0.0165;
    //     case 'TIERCE_PLAFONNEE':
    //         return Math.max(vehicle.valueVenal * 0.042, 100000);
    //     case 'INCENDIE':
    //         return vehicle.valueVenal * 0.0015;
    //     default:
    //         throw new Error('Garantie non reconnue');
    //     }
    // }
}