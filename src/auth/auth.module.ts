import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports:[ 
    ConfigModule.forRoot(),
    JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '360000s' },
  }),
UsuariosModule,
PassportModule
],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
