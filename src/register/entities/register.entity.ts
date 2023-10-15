import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hasPassword() {
    console.log('hasPassword');
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}
