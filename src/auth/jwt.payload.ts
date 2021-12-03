import { TipoUsuario } from "src/enums/tipo-usuario.enum";

export interface JWTPayload {
    login: string;
    rol:TipoUsuario
  }