import { IsDate, IsObject, IsString } from "class-validator";

export class CreateSubscriptionDto {
    @IsString()
    simulationId: string;
    @IsString()
    userId: string;

    @IsString()
    firstName: string;
    @IsString()
    lastName : string;
    @IsString()
    ciNumber : string;
    @IsString()
    phone    : string;
    @IsString()
    address  : string;
    @IsString()
    city     : string;

    @IsString()
    immatriculation: string;
    @IsString()
    color: string;
    @IsString()
    seats: number;
    @IsString()
    doors: number;
    @IsString()
    vehicleCategoryCode: string;
}
