import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ObjectIdColumn,
    ObjectID,
  } from 'typeorm';
  
  @Entity('inventory')
  export class Inventory {
    @ObjectIdColumn()
    id: ObjectID;
  
    @Column()
    inventoryName: any;
  
    @Column({ length: 128 })
    status: any;

    @Column()
    quantity: number;
  
    @Column({ length: 256 })
    unit: string;

    @Column({ nullable: true })
    lastLogin: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @CreateDateColumn()
    updatedAt: Date;
  
    constructor(inventory?: Partial<Inventory>) {
      Object.assign(this, inventory);
    }
  }
  