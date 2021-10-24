import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from 'src/products/products.schema';
import { ProductsService } from 'src/products/products.service';
import { ErrorObj } from '../errModel';
import { SellingController } from './selling.controller';
import { Sellings, SellingsSchema } from './selling.schema';
import { SellingsService } from './selling.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sellings.name, schema:SellingsSchema },
    ]),
    MongooseModule.forFeature([
      { name: Products.name, schema:ProductsSchema },
    ]),
  ],
  controllers: [SellingController],
  providers: [SellingsService, ErrorObj,ProductsService],
})
export class SellingsModule {}