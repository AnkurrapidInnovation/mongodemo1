import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import dbConfig from 'dbconfig';
import { diskStorage } from 'multer';
// import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { fileURLToPath } from 'url';
import { runInThisContext } from 'vm';
import { ErrorObj } from '../errModel';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
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
  @UseGuards(JwtAuthGuard)
  @Post('createProducts')
  async createNewProduct(@Body() data): Promise<any> {
    try {
      if (!data.productName) {
        return this.errService.response(true, 'Please enter an  productName.');
      } else if (!data.productDescription) {
        return this.errService.response(
          true,
          'Please enter an productdescripton',
        );
      } else if (!data.img) {
        return this.errService.response(true, 'Please enter the img.');
      } 
      else if (!data.categories) {
        return this.errService.response(true, 'Please enter the categories.');
      } 
      else if (!data.size) {
        return this.errService.response(true, 'Please enter the size.');
      } 
      else if (!data.color) {
        return this.errService.response(true, 'Please enter the  color.');
      } 
      else if (!data.price) {
        return this.errService.response(true, 'Please enter the  price.');
      } 
      else {
        await this.productsService.createProduct(data);
        return this.errService.response(false, 'products created');
      }
    } catch (e) {
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

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllProducts(): Promise<any> {
    try {
      const allProducts = await this.productsService.viewAllProducts();
      if (allProducts) {
        return this.errService.response(false, allProducts);
      } else {
        return this.errService.response(true, 'No products available');
      }
    } catch (e) {
      throw new Error(e);
    }
  }

 
  

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({ 
        destination: './files',
        filename: (req, file, callback) => {
          const fileNameSplit = file.originalname.split(".");
          const fileExt = fileNameSplit[fileNameSplit.length-1];
          // const name = file.originalname.split('.')[0];
          // const fileExtName = extname(file.originalname);
          // const randomName = Date.now();
          callback(null, `$(Date.now()).${fileExt}`);
        }
      }),
    }))
    async createImage(@UploadedFiles() images,  @Body() data): Promise<any> {
      console.log(images);
    //  console.log(body.firstName);
    // console.log(body.favoriteColor);
    try {
      if(!data.productName) {
        return this.errService.response(true, 'Please enter an product name.');
      } else if (!data.images) {
        return this.errService.response(true, 'Please enter an images');
      }
      // else {
      //   data['imageUrl'] = data.imageHash;
      //   const imageArr = [data];
      //   const checkimageHash = await this.productsService.productsImage(data['imageHash'])
      // }
      // if(checkimageHash){
      //   return new BadRequestException({
      //     msg: 'This image was already uploaded.'
      //   });
      // } else {
      //   const product = await this.productsService.createProduct(imageArr);
      //   return this.errService.response(false, product);
      // }
      else {
        return await this.productsService.productsImage(images)
      }
    }catch (e) {
      throw new Error(e);
    }
  }
     
    }

 

 

      
  

