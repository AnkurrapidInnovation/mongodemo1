import { Body, Controller, Get, Post, Put, Request } from '@nestjs/common';
import { ErrorObj } from '../errModel';
import { BuyingsService } from './buying.service';


@Controller('buying')
export class BuyingController {
  constructor(private readonly buyingsService:BuyingsService,
    private readonly errService: ErrorObj,
    ) {}

  //   @Post('createUser')
  //   async createUser(@Body() data): Promise<any> {
  //     const create = await this.usersService.createUser(data);
  //   }

  // @Post('createSports')
  // async createSport(
  //   @Body('football') football: string,
  //   @Body('basketball') basketball: string,
  //   @Body('userId')  usersId: string,
  // )
  //  {
  //   const usersId = await this.sportsService.createSport(
  //     football,
  //     basketball,
  //   );
  //   return { id: usersId };
  // }

  @Post('createBuying')
  async createNewBuyings(@Body() data ): Promise<any> {
    try {
      if (!data.amount) {
        return this.errService.response(true, 'Please enter an amount.');
      } 
      // else if (!data.price) {
      //   return this.errService.response(true, 'Please enter a price');
      // } 
      else if (!data.usersId) {
        return this.errService.response(true, 'Please enter an userId');
     } 
      else if(!data.products) {
        return this.errService.response(true,'please enter an products')
      }

      else {
        await this.buyingsService.createBuyings(data);
        return this.errService.response(false, 'buy created');
      }
      }catch (e) {
        throw new Error(e);
      }
    

  }



  // @Get('all')
  // async allSports(@Request() req): Promise<any> {
  //   try {
  //     const sports = await this.sportsService.getAllSports(req.user);

      
  //     return this.errService.response(false, ports);
  //     // }else{
  //     //     return this.errService.response(true, "No Artists available.");
  //     // }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  @Get('all')
  async getAllbuyings(): Promise<any> {
    try {
      const allProducts = await this.buyingsService.viewAllBuyings();
      if (allProducts ) {
        return this.errService.response(false, allProducts);
      } else {
        return this.errService.response(true, 'get all buyings');
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  // @Get('allproducts')
  // async getAllproducts2(): Promise<any> {
  //   try {
  //     const allProducts2 = await this.buyingsService.viewAllBuyings2();
  //     if (allProducts2 ) {
  //       return this.errService.response(false, allProducts2);
  //     } else {
  //       return this.errService.response(true, 'products');
  //     }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
 

  // @Get('getAllSports')
  // async getAllSports() {
  // const user = await this.sportsService.allSports();
  // return user;
  // }
  @Put('updatebuying')
  async updateBuyings(
  
    @Body('products') products,
  
   
  ): Promise<any> {
    if (!products) {
      return this.errService.response(true, 'Please provide products');
    } 
    else {
      await this.buyingsService.updateBuyings(products);
      return this.errService.response(false, products);
    }
    } 

    @Put('')
update( @Body() products) {
  return this.buyingsService.update(products);
}


}
