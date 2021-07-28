import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/create-user.dto';
import { User } from 'src/users/user.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private BooksRepository: Repository<Book>,
    @InjectRepository(User)
    private UsersRepository: Repository<User>,
  ) {}  

  getAllBooks(): Promise<Book[]> {
    return this.BooksRepository.find();
  }

  getBook(id: string): Promise<Book> {
    return this.BooksRepository.findOne(id);
  }

  getAvailableBooks(): Promise<Book[]> {
    return this.BooksRepository.find({ where : {isBooked: false}});
  }

  async addNewBook(book: CreateBookDto): Promise<InsertResult> {
    return this.BooksRepository
                .createQueryBuilder()
                .insert() 
                .into(Book)
                .values(book)
                .execute();
  }


  getAllUsers(): Promise<User[]> {
    return this.UsersRepository.find();
  }

  async getUser(id: string) {
    let user = await this.UsersRepository.findOne(id);
    user.books = await this.UsersRepository.createQueryBuilder()
                .relation(User, "books")
                .of(id)
                .loadMany();
    return user;
  }

  buySubscription(userId: string): Promise<UpdateResult> {
    return this.UsersRepository
        .createQueryBuilder()
        .update(User)
        .set({ subscription: true })
        .where("id = :id", {id: userId})
        .execute();
  }

  async takeBook(userId: string, bookId: string) {
    const user: User = await this.getUser(userId); 
    const book: Book = await this.getBook(bookId); 

    if (!user || !user.subscription) {
        return "User has no subscription";
    }

    const books = await this.UsersRepository.createQueryBuilder()
                        .relation(User, "books")
                        .of(user)
                        .loadMany();

    if (books.length >= 5) {
        return "User cannot take more books";
    }
    if (!book || book.isBooked) {
      return "Book out of stock";
    }

    this.BooksRepository
        .createQueryBuilder()
        .update(Book)
        .set({ isBooked: true })
        .where("id = :id", {id: bookId})
        .execute();

    this.BooksRepository
        .createQueryBuilder()
        .relation(Book, "user")
        .of(book)
        .set(user);

    return "Success";


  }

  async returnBook(bookId: string): Promise<UpdateResult> {
    this.BooksRepository
            .createQueryBuilder()
            .relation(Book, "user")
            .of(bookId)
            .set(null);
    
    return this.BooksRepository
            .createQueryBuilder()
            .update(Book)
            .set({ isBooked: false })
            .where("id = :id", {id: bookId})
            .execute();
  }

  async addNewUser(user: CreateUserDto): Promise<InsertResult> {
    return this.UsersRepository
                .createQueryBuilder()
                .insert() 
                .into(User)
                .values(user)
                .execute();
  }
}
