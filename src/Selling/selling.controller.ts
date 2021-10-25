import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ErrorObj } from '../errModel';
import { SellingDto } from './dto/selling-dto';
import { SellingsService } from './selling.service';


@Controller('selling')
export class SellingController {
  constructor(private readonly sellingsService:SellingsService,
    private readonly errService: ErrorObj,
    private readonly productsService: ProductsService,
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

  @Post('createSelling')
  async createNewSellings(@Body() data ): Promise<any> {
    try {
      if (!data.usersId) {
        return this.errService.response(true, 'Please enter an userId.');
      } else if (!data.products) {
        return this.errService.response(true, 'Please enter an products');
      } 
      //else if (!data.quantity) {
      //   return this.errService.response(true, 'Please enter an quantity');
      // } 
      else {
        await this.sellingsService.createBuyings(data);
        return this.errService.response(false, 'sellings created');
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
  async getAllSellings(): Promise<any> {
    try {
      const allSellings = await this.sellingsService.viewAllSellings();
      if (allSellings ) {
        return this.errService.response(false, allSellings);
      } else {
        return this.errService.response(true, ' get all selling');
      }
    } catch (e) {
      throw new Error(e);
    }
  }
 

  // @Get('getAllSports')
  // async getAllSports() {
  // const user = await this.sportsService.allSports();
  // return user;
  // }

  @Post('deleteProduct')
  async deleteArtists(@Body('productId') productId): Promise<any> {
    try {
      if (!productId) {
        return this.errService.response(true, 'Please provide the product Id');
      } else {
       
        await this.productsService.deleteproduct(productId);
       
        return this.errService.response(false, 'product deleted');
      }
    } catch (e) {
      return this.errService.response(true, 'Some Error occurred');
    }
  }



// @UseGuards(JwtAuthGuard)
@Put('updateselling')
async updateProducts(

  @Body('products') products,

 
): Promise<any> {
  if (!products) {
    return this.errService.response(true, 'Please provide products');
  } 
  // else if (!products) {
  //   return this.errService.response(true, 'please provide productsId');
  // } else if (!quantity) {
  //   return this.errService.response(true, 'please provide quantity');
  // } 
  else {
    await this.sellingsService.updateProducts(products);
    return this.errService.response(false, products);
  }
  } 
// @Patch(':id')
// async updateArt(
//   @Param('id') artId: string,
//   @Body('title') artTitle: string,
//   @Body('description') artDesc: string,
//   @Body('price') artPrice: number,
// ) {
//   await this.artsService.updateArt(artId, artTitle, artDesc, artPrice);
//   return null;
// }

@Put('')
update( @Body() products) {
  return this.sellingsService.update(products);
}

}



