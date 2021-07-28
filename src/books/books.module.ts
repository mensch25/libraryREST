import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), TypeOrmModule.forFeature([User])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
