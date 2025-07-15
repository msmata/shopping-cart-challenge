import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { Discount } from '../entities/discount.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ShoppingCart)
    private readonly cartRepo: Repository<ShoppingCart>,
    @InjectRepository(Discount)
    private readonly discountRepo: Repository<Discount>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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

      const discount = this.discountRepo.create({category: 'electronica', percent: 0.1});
      await this.discountRepo.save(discount);

      const user = this.userRepo.create({username: 'pepe', password: 'admin'});
      await this.userRepo.save(user);

      console.log('🌱 Datos de prueba insertados (productos, carrito, descuentos y usuario)');
    }
  }
}
