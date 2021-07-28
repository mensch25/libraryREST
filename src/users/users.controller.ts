import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { InsertResult, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { BooksService } from 'src/books/books.service';
import { CreateUserDto } from './create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly BooksService: BooksService) {
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.BooksService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string){
    return this.BooksService.getUser(id);
  }

  @Put('subscription')
  async buySubscription(@Query('id') id: string): Promise<UpdateResult> {
    return this.BooksService.buySubscription(id);
  }

  @Put('take')
  async takeBook(@Query('user') userId: string, @Query('book') bookId: string) {
    return this.BooksService.takeBook(userId, bookId);
  }

  @Post()
  async addNewUser(@Body() user: CreateUserDto): Promise<InsertResult> {
    return this.BooksService.addNewUser(user);
  }

}
