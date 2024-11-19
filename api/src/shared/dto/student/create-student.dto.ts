import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Length(3, 255, { message: 'Nome deve ter entre 3 e 255 caracteres' })
  name: string;

  @IsString({ message: 'Email deve ser uma string' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  @Length(3, 255, { message: 'Email deve ter entre 3 e 255 caracteres' })
  email: string;

  @IsString({ message: 'RA deve ser uma string' })
  @IsNotEmpty({ message: 'RA é obrigatório' })
  @Length(3, 100, { message: 'RA deve ter entre 3 e 100 caracteres' })
  ra: string;

  @IsString({ message: 'CPF deve ser uma string' })
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @Length(3, 14, { message: 'CPF deve ter entre 3 e 14 caracteres' })
  cpf: string;
}
