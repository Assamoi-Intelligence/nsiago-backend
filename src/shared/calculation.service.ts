import { Injectable } from '@nestjs/common';

interface PrimeParams {
    valueNew: number,
    valueVenal: number,
    power: number,
    garantees: string[],
}

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

    private calculateRC(power: number) {
        return this.rates.find(r => power <= r.max)?.value ?? 0;
    }

    private calculateVehicleAge(circulationDate: Date): number {
        const today = new Date();
        return today.getFullYear() - circulationDate.getFullYear();
    }

    validateGuarantees(circulationDate: Date, garanties: string[]) {
        const vehicleAge = this.calculateVehicleAge(circulationDate);
        garanties.forEach(garantie => {
          switch(garantie) {
            case 'DOMMAGE':
              if(vehicleAge > 5) throw new Error('Garantie DOMMAGE non disponible pour véhicules >5 ans');
              break;
            case 'TIERCE_COLLISION':
              if(vehicleAge > 8) throw new Error('Garantie TIERCE_COLLISION non disponible pour véhicules >8 ans');
              break;
            case 'TIERCE_PLAFONNEE':
              if(vehicleAge > 10) throw new Error('Garantie TIERCE_PLAFONNEE non disponible pour véhicules >10 ans');
              break;
          }
        });
    }

    getPrime(primeParams: PrimeParams) {
        const {power, garantees, valueNew, valueVenal} = primeParams;
        let prime = this.calculateRC(power);
        for(const garantie of garantees) {
            switch(garantie) {
                case 'DOMMAGE':
                    prime += valueNew * 0.026;
                    break;
                case 'TIERCE_COLLISION':
                    prime += valueNew * 0.0165;
                    break;
                case 'TIERCE_PLAFONNEE':
                    prime += valueVenal * 0.042;
                    if(prime < 100000) prime = 100000; // Prime minimum
                    break;
                case 'VOL':
                    prime += valueVenal * 0.0014;
                    break;
                case 'INCENDIE':
                    prime += valueVenal * 0.0015;
                    break;
            }
        }
        return prime;
    }

}