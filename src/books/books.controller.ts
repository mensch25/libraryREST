import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { InsertResult, UpdateResult } from 'typeorm';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book.dto';


@Controller('books')
export class BooksController {
  constructor(private readonly BooksService: BooksService) {
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.BooksService.getAllBooks();
  }

  @Get('id')
  async getBook(@Query('id') id: string): Promise<Book> {
    return this.BooksService.getBook(id);
  }

  @Get('available')
  async getAvailableBooks(): Promise<Book[]> {
    return this.BooksService.getAvailableBooks();
  }


  @Put('return')
  async returnBook(@Query('book') bookId: string): Promise<UpdateResult> {
    return this.BooksService.returnBook(bookId);
  }

  @Post()
  async addNewBook(@Body() book: CreateBookDto): Promise<InsertResult> {;
    return this.BooksService.addNewBook(book);
  }

}
