import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; 

  @Column()
  author: string;
  
  @Column()
  yearOfPublishing: number;

  @ManyToOne(type => User, user => user.books)
  user: User;

  @Column({ default: false })
  isBooked: boolean;
}
