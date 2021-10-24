import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import  * as mongoose from 'mongoose';
import { Sellings, SellingsDocument } from './selling.schema';
import {  Schema } from '@nestjs/mongoose';



@Injectable()
export class SellingsService {
  constructor(
    @InjectModel(Sellings.name)
    private readonly sellingsModel: Model<SellingsDocument>,
  ) {}



  async createBuyings(obj): Promise<any> {
    try {
      let createSellings = await this.sellingsModel.create(obj);
      return createSellings;
    } catch (e) {
      throw new Error(e);
    }
  }

  async viewAllSellings(): Promise<Sellings[]> {
    try {
      const sellings = await this.sellingsModel.aggregate([
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
        // {
        //   $project: {
        //    football:1,
        //    basketball:1,
        //    firstName:{ $arrayElemAt: ['$users.firstName',1] },
        //    lastName: { $arrayElemAt: ['$users.lastName', 1] },
        //   }
        // }
      ]);
      return sellings;
    } catch (e) {
      throw new Error(e);
    }
  }
  

  // async viewAllSellings2(): Promise<Sellings[]> {
  //   try {
  //     const sellings= await this.sellingsModel.aggregate([
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
  //     return sellings;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }



  // async updateProducts1(obj): Promise<any> {
  //   try {
  //     const products = mongoose.Types.ObjectId(obj.productsId);
  //     const data = await this.sellingsModel.updateOne(
  //       { _id: usersId },
  //       {
  //         Products:products,
  //         Amount:amount
        
  //       }
  //     );
  //     return data;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }



  // async updateProducts(obj): Promise<any> {
   
  //   try {
  //     const usersId = new  mongoose.Types.ObjectId(obj.usersId);

  //     const data = await this.sellingsModel.aggregate([
  //       {
  //         $match: {
  //           adminId: usersId
  //         }
  //       },
  //       {
  //         // const quantity = 5,
  //         $set: {
  //           products:{
  //             productsId:"61754917ed8efe2af95646a2",
  //             quantity:6,
              
  //           },
          
          
  //         }
  //       },

  //     ])

  //       // {
  //       //   $lookup: {
  //       //     from: 'products',
  //       //     localField: 'productsId',
  //       //     foreignField: '_id',
  //       //     as: 'productsDetails'
  //       //   }
  //       // },
  //       // {
  //       //   $project: {
  //       //    football:1,
  //       //    basketball:1,
  //       //    firstName:{ $arrayElemAt: ['$users.firstName',1] },
  //       //    lastName: { $arrayElemAt: ['$users.lastName', 1] },
  //       //   }
  //       // }
  //     // ]);
  //     return data;
  //     // console.log(data)

  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }


  // async updateProducts(): Promise<any> {
  //   try {
      
  //     let quantity;
  //     let selling = await this.sellingModel.findByIdAndUpdate();
  //     if(quantity=0){
  //         for(let i=0; i<quantity; i++){
             
  //             }else{
  //                 quantity
  //             }
            
  //         }
  //     }
  //     await this.sellingsModel.updateProducts();

  //     return selling;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // async updateOngoingAuctionTimer(ids): Promise<any> {
  //   await this.artModel.updateMany({ _id: { $in: ids } }, { isAuctionTimerEnded: true });
  //   return true;
  // }

  // async updateProducts(quantity):Promise<any>{
  //   const usersId = new  mongoose.Types.ObjectId(quantity);

  //   await this.sellingsModel.findByIdAndUpdate({_id:{$in:quantity}});
  //   return true
  // }

  // async updateProducts() {
 

  //   const Quantity = await this . sellingsModel.findByIdAndUpdate(
  //     { productsId: "617540557c0eec6da4dcb7df" },
  
  //     { $inc: { quantity: 1 } },
  //     { new: true }
  //   );
  
    
  //   return this.Quantity.quantity;
  // }


  

}