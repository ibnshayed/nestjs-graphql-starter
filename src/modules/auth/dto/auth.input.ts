import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserWithoutPassword } from 'src/modules/user/dto/user.input';

@InputType()
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  @IsString()
  accessToken: string;

  @Field()
  @IsString()
  refreshToken: string;

  @Type(() => UserWithoutPassword)
  user: UserWithoutPassword;
}
