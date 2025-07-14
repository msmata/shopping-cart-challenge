import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ShoppingCart } from '../entities/shopping-cart.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ShoppingCart)
    private readonly cartRepo: Repository<ShoppingCart>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.productRepo.count();
    if (count === 0) {
      const p1 = this.productRepo.create({ name: 'Camiseta', price: 1000, category: 'ropa' });
      const p2 = this.productRepo.create({ name: 'Celular', price: 50000, category: 'electronica' });
      await this.productRepo.save([p1, p2]);

      const cart = this.cartRepo.create({
        userId: 'user123',
        products: [p1, p2],
      });

      await this.cartRepo.save(cart);

      console.log('🌱 Datos de prueba insertados (productos y carrito)');
    }
  }
}
