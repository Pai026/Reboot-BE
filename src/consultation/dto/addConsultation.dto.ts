import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddConsultationDto {
  @ApiProperty({ example: null })
  patientId:string

  @ApiProperty({example:null})
  symptom: string;

  @ApiProperty({ example:null })
  examinationDetail:string

  @ApiProperty({ example:null })
  treatmentSummary:string

  @ApiProperty({ example:null })
  category:string

  @ApiProperty({ example:null })
  advice:string

  @ApiProperty({ example:null })
  prescription:string

  @ApiProperty({ example:null })
  verifiedBy:string
}
