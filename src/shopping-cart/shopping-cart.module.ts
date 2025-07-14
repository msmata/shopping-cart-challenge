import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './services/shopping-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Product } from './entities/product.entity';
import { Discount } from './entities/discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, Product, Discount])],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule {}
