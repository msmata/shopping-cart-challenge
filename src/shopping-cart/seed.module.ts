import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SeedService } from './services/seed.service';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Discount } from './entities/discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ShoppingCart, Discount])],
  providers: [SeedService],
})
export class SeedModule {}
