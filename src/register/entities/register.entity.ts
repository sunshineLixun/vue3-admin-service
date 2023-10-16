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

  // 在插入数据库之前会执行这个函数
  @BeforeInsert()
  async hasPassword() {
    // 对paasword进行加密
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}
