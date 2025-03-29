import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateSimulationDto {
    @IsString()
    productCode: string;

    @IsString()
    vehicleCategoryCode: string;

    @IsString()
    userId: string;

    @IsNumber()
    valueNew: number;
    
    @IsNumber()
    valueVenal: number;

    @IsNumber()
    power: number;

    @IsDate()
    circulationDate: Date;    
}
