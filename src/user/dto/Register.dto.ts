import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: null })
  @IsString()
  userName: string;

  @ApiProperty({ example: null })
  @IsString()
  dob: string;

  @ApiProperty({ required: false, example: null })
  @ApiProperty({ example: null })
  @IsString()
  @MinLength(8)
  @MaxLength(49)
  @Matches(/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#$%^&*]).{8,}$/, {
    message: 'Password too Weak',
  })
  password: string;

  @ApiProperty({ example: null })
  @IsString()
  confirm: string;

  @ApiProperty({ example: null })
  @IsNumber()
  number: number

  @ApiProperty({example:null})
  state:string

  @ApiProperty({example:null})
  ward:string

  @ApiProperty({example:null})
  district:string

  @ApiProperty({example:null})
  localBody:string

}
