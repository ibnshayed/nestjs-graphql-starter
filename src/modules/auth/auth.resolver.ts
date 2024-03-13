import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { AuthResponse, LoginDto } from './dto/auth.input';

@Public()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthResponse)
  login(@Args('loginInput') input: LoginDto) {
    return this.authService.login(input);
  }
  @Query(() => AuthResponse)
  refreshToken(@Args('token', { type: () => String }) token: string) {
    return this.authService.refreshToken(token);
  }
}
