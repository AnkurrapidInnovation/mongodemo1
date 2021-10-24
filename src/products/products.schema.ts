import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from '../users/users.schema';
import * as mongoose from 'mongoose';


export type ProductsDocument = Products & Document;

@Schema()
export class Products {
  @Prop()
  productName: string;

  @Prop()
  productDescription: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' })
  // usersId: Users;

  @Prop()
  img: string;

  @Prop()
  price:Number;

  @Prop()
  color:string;

  @Prop()
  size:string;

  @Prop({ default: [] })
  categories: [string];

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
  

  
}

export const ProductsSchema = SchemaFactory.createForClass(Products);