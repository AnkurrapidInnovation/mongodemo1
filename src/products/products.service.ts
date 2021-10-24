import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import   mongoose from 'mongoose';
import { Products, ProductsDocument } from './products.schema';


@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly productsModel: Model<ProductsDocument>,
  ) {}



  async createProduct(obj): Promise<any> {
    try {
      let createProduct = await this.productsModel.create(obj);
      return createProduct;
    } catch (e) {
      throw new Error(e);
    }
  }

  async viewAllProducts(): Promise<Products[]> {
    try {
      const products = await this.productsModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'usersId',
            foreignField: '_id',
            as: 'usersDetails'
          }
        },
        // {
        //   $project: {
        //    football:1,
        //    basketball:1,
        //    firstName:{ $arrayElemAt: ['$users.firstName',1] },
        //    lastName: { $arrayElemAt: ['$users.lastName', 1] },
        //   }
        // }
      ]);
      return products;
    } catch (e) {
      throw new Error(e);
    
    
  }
  }

  async deleteproduct(productId): Promise<any> {
    try {
      await this.productsModel.deleteOne({ productId: productId });

      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async productsImage(ipfsHash): Promise<any> {
    const product = await this.productsModel.find({ imageHash: ipfsHash });

    if (product && product.length) {
      return true;
    } else {
      return false;
    }
  }

}