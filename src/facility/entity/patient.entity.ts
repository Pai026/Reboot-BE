import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ObjectIdColumn,
    ObjectID,
  } from 'typeorm';
  
  @Entity('patient')
  export class Patient {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    facilityID: any;

    @Column()
    type: any;
  
 
    @Column({ length: 128 })
    userName: any;

    @Column({ length: 128 })
    password: any;
  
    @Column({ length: 256 })
    address: string;

    @Column({ length: 256 })
    diseaseStatus: string;

    @Column({ length: 256 })
    testType: string;

    @Column({})
    dob: any;

    @Column({ length: 256 })
    dateofSample: any;

    @Column({ length: 256 })
    dateOfResult: string;

    @Column({ length: 256 })
    gender: string;

    @Column({ length: 256 })
    district: string;

    @Column({ length: 256 })
    localBody: string;

    @Column({ length: 256 })
    nationaity: string;

    @Column({ length: 256 })
    ward: any;

    @Column({ length: 256 })
    bloodGroup: any;
  
    @Column({ nullable: false })
    phoneNumber: number;

    @Column()
    pincode: number;
  
    @Column({ type: 'jsonb', nullable: true })
    medicalHistory: any;

    @Column({ length: 256 })
    ongingMedication: string;

    @Column({ length: 256 })
    nationality: string;
    
    @Column({})
    status:any;

    @Column({ length: 256 })
    allergies: string;

    @Column({ length: 256 })
    NoOfAgedDependants: any;

    @Column({ length: 256 })
    travelHistory: string;

    @Column({ length: 256 })
    state: string;

    @Column({ nullable: true })
    lastLogin: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @CreateDateColumn()
    updatedAt: Date;
  
    constructor(patient?: Partial<Patient>) {
      Object.assign(this, patient);
    }
  }
  