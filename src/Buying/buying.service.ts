import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as    mongoose from 'mongoose';
import { Buyings, BuyingsDocument } from './buying.schema';


@Injectable()
export class BuyingsService {
  constructor(
    @InjectModel(Buyings.name)
    private readonly buyingsModel: Model<BuyingsDocument>,
  ) {}



  async createBuyings(obj): Promise<any> {
    try {
      let createBuyings = await this.buyingsModel.create(obj);
      return createBuyings;
    } catch (e) {
      throw new Error(e);
    }
  }

  async viewAllBuyings(): Promise<Buyings[]> {
    try {
      const buyings = await this.buyingsModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'usersId',
            foreignField: '_id',
            as: 'usersDetails'
          }
        },

        {
          $lookup: {
            from: 'products',
            localField: 'productsId',
            foreignField: '_id',
            as: 'productsDetails'
          }
        },
        {
          $project: {
           quantity:1,
          //  basketball:1,
          //  firstName:{ $arrayElemAt: ['$users.firstName',1] },
          //  lastName: { $arrayElemAt: ['$users.lastName', 1] },
          }
        }
      ]);
      return buyings;
    } catch (e) {
      throw new Error(e);
    }
  }
  

  // async viewAllBuyings2(): Promise<Buyings[]> {
  //   try {
  //     const buyings = await this.buyingsModel.aggregate([
  //       {
  //         $lookup: {
  //           from: 'products',
  //           localField: 'productsId',
  //           foreignField: '_id',
  //           as: 'productsDetails'
  //         }
  //       },
  //       // {
  //       //   $project: {
  //       //    football:1,
  //       //    basketball:1,
  //       //    firstName:{ $arrayElemAt: ['$users.firstName',1] },
  //       //    lastName: { $arrayElemAt: ['$users.lastName', 1] },
  //       //   }
  //       // }
  //     ]);
  //     return buyings;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  async updateBuyings(obj): Promise<any> {
   
    try {
      const usersId = new  mongoose.Types.ObjectId(obj.usersId);

      const data = await this.buyingsModel.aggregate([
        {
          $match: {
            adminId: usersId
          }
        },
        {
          $set: {
            products:{
              productsId:"617540557c0eec6da4dcb7df",
              quantity:6,
              
            },
          
          
          }
        },
        // console.log(usersId)

      ])
      return data;
      // console.log(data)

    } catch (e) {
      throw new Error(e);
    }
  }

  // async saveArtTokenId(artId, tokenId): Promise<any> {
  //   try {
  //     const data = await this.artModel.updateOne({ _id: artId }, { tokenId: tokenId, auctionStatus: 6 });
  //     return data;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
  async update(products): Promise<any> {
    

    try {
      const data = await this.buyingsModel.updateMany(products);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }


}
