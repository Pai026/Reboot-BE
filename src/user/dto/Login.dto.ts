import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: null })
  userName: string;

  @ApiProperty({ example: null })
  @IsString()
  password: string;
}
