import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Friend } from './friend.entity';

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    name: 'NAME',
  })
  name: string;

  @Column()
  emails: string;

  @OneToMany(() => Friend, (friend) => friend.user)
  friends: Friend[];
}
