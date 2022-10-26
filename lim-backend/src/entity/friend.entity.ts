import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('FRIEND')
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'PRICE',
  })
  price: number;

  @ManyToOne(() => User, (user) => user.friends)
  user: User;
}
