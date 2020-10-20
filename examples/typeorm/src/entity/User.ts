import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

@Entity({ name: 'users' })
export class User extends BaseModel {
  @Column()
  name: string;

  @Column()
  age: number;
}
