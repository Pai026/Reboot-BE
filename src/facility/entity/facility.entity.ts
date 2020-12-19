import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ObjectIdColumn,
    ObjectID,
  } from 'typeorm';
  
  @Entity('facility')
  export class Facility {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    facilityID: any;
  
    @Column()
    facilityType: any;

    @Column()
    type: any;
  
    @Column({ length: 128 })
    userName: any;

    @Column({ length: 128 })
    password: any;
  
    @Column({ length: 256 })
    address: string;

    @Column({ length: 256 })
    state: string;

    @Column({ length: 256 })
    district: string;

    @Column({ length: 256 })
    localBody: string;

    @Column({ length: 256 })
    ward: any;
  
    @Column({ nullable: false })
    contact: number;

    @Column()
    pincode: number;
  
    @Column({ nullable: true })
    oxygenCapacity: any;

    @Column({ nullable: true })
    latitude: any;

    @Column({ nullable: true })
    longitude: any;

    @Column({ type: 'jsonb', nullable: true })
    bed: any;
    
    @Column({ type: 'jsonb', nullable: true })
    doctors: any;

    @Column({ nullable: true })
    lastLogin: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @CreateDateColumn()
    updatedAt: Date;
  
    constructor(facility?: Partial<Facility>) {
      Object.assign(this, facility);
    }
  }
  