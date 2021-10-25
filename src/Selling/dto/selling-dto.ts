import { IsNotEmpty, IsNumber } from "class-validator";

export class SellingDto {

    // @IsNotEmpty()
    // name: string;

   
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    // @IsNotEmpty()
    // @IsMongoId()
    // category: any;

}