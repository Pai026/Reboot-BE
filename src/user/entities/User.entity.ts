import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ length: 128 })
  userName: string;

  @Column({ length:128 })
  type: string;

  @Column({ length:128 })
  password: any;
  
  @Column({ length:128 })
  phoneNumber: number;

  @Column({ length:128 })
  state: string;

  @Column({ length:128 })
  district:string;

  @Column({ length:128 })
  localBody:string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
