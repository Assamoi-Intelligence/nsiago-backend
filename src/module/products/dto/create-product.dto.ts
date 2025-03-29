import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    code: string;
    @IsString()
    name: string;
    @IsArray()
    @ArrayNotEmpty()
    @IsString({each: true})
    categories:  string[];
    @IsArray()
    @ArrayNotEmpty()
    @IsString({each: true})
    guarantees:  string[];
}
