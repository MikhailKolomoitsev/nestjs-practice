import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    //generate pass hash
    const hash = await argon.hash(dto.password);
    //save a new user in DataBase
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    //return saved user

    delete user.hash
    return user;
  }

  signin() {
    return { msg: 'hi signed in' };
  }
}
