import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthResponse, LoginDto } from './dto/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ username }, '+password', {
      lean: true,
    });
    if (user) {
      const validatePassword = await bcrypt.compare(pass, user.password);

      if (!validatePassword) {
        return new BadRequestException('Invalid credential');
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async getAccessToken(user: User) {
    return await this.jwtService.signAsync(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      {
        secret: this.configService.get('jwt.accessToken.secret'),
        expiresIn: this.configService.get('jwt.accessToken.expireIn'),
      },
    );
  }

  private async getRefreshToken(user: User) {
    return await this.jwtService.signAsync(
      {
        _id: user._id,
      },
      {
        secret: this.configService.get('jwt.refreshToken.secret'),
        expiresIn: this.configService.get('jwt.refreshToken.expireIn'),
      },
    );
  }

  async login(dto: LoginDto) {
    const { username, password } = dto;
    const user = await this.validateUser(username, password);

    if (!user) {
      return new BadRequestException('Invalid credential');
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(user),
      this.getRefreshToken(user),
    ]);

    return <AuthResponse>{
      accessToken,
      refreshToken,
      user,
    };
  }

  async refreshToken(token: string) {
    const verifyToken = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('jwt.refreshToken.secret'),
    });
    if (!verifyToken) {
      return new BadRequestException('Invalid token');
    }
    const decodeToken = await this.jwtService.decode(token);
    const { _id } = decodeToken;
    const user = await this.userService.findOne({ _id });
    if (!user) {
      return new BadRequestException('Invalid credential');
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(user),
      this.getRefreshToken(user),
    ]);

    return <AuthResponse>{
      accessToken,
      refreshToken,
      user,
    };
  }
}
