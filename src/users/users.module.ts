import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { BooksService } from 'src/books/books.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [BooksService],
})
export class UsersModule {}
