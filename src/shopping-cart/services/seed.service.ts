import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.productRepo.count();
    if (count === 0) {
      await this.productRepo.insert([
        { name: 'Camiseta', price: 1000, category: 'ropa' },
        { name: 'Celular', price: 50000, category: 'electronica' },
        { name: 'Zapatillas', price: 15000, category: 'calzado' },
      ]);
      console.log('🌱 Datos de prueba insertados');
    }
  }
}
