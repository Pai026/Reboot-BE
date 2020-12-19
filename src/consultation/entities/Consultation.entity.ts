import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('consultation')
export class Consultation {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ length: 128 })
  patientId: string;

  @Column({length:128})
  symptom: string;

  @Column({ length:128 })
  examinationDetail:string

  @Column({ length:128 })
  treatmentSummary:string

  @Column({ length:128 })
  category:string

  @Column({ length:128 })
  advice:string

  @Column({ length:128 })
  prescription:string

  @Column({ length:128 })
  verifiedBy:string


  constructor(consultation?: Partial<Consultation>) {
    Object.assign(this, consultation);
  }
}
