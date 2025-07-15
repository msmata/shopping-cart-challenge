import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async validateUserAndGenerateToken(username: string, password: string) {
        const user = await this.userRepo.findOneBy({ username, password });

        if (!user) return null;

        const payload = { sub: user.username };
        return this.jwtService.sign(payload);
    }
}
