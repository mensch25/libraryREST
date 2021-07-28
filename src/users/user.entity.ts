import { Book } from 'src/books/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column({default: false})
  subscription: boolean;

  @OneToMany(type => Book, book => book.user)
  books: Book[];
}
