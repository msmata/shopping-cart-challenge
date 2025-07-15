import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async validateUserAndGenerateToken(username: string, password: string) {
        const user = await this.userRepo.findOneBy({ username, password });
        this.logger.log("User: ", user);

        if (!user) return null;

        const payload = { sub: user.username };
        return this.jwtService.sign(payload);
    }
}
