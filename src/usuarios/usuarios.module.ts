import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsuariosController } from './usuarios.controller';
import { Usuarios } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuarios]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports:[UsuariosService]
})
export class UsuariosModule {}
