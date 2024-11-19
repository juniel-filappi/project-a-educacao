import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateStudentDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Length(3, 255, { message: 'Nome deve ter entre 3 e 255 caracteres' })
  name: string;

  @IsString({ message: 'Email deve ser uma string' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  @Length(3, 255, { message: 'Email deve ter entre 3 e 255 caracteres' })
  email: string;
}
