
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from '../users/users.schema';
import * as mongoose from 'mongoose';
import { Products } from 'src/products/products.schema';


export type SellingsDocument = Sellings & Document;

@Schema()
export class Sellings {
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' })
  usersId: Users;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' })
  // productsId: Products;

  @Prop({ default: [] })
  products: [{productsId:string, quantity:Number}];

  // @Prop()
  // quantity:Number

  // @Prop()
  // amount: Number;


  
}

export const SellingsSchema = SchemaFactory.createForClass(Sellings);