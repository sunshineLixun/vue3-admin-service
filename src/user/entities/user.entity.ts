import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  // 选项会在查表时跳过当前字段
  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  // 在插入数据库之前会执行这个函数
  @BeforeInsert()
  async hasPassword() {
    // 对password进行加密
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}
