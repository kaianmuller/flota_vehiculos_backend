import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Bienvenido al servidor Flota de Vehiculos!";
  }
}
