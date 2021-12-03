import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { TipoUsuario } from 'src/enums/tipo-usuario.enum';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import { In, Repository } from 'typeorm';

const fs = require('fs');
const readline = require('readline');

@Injectable()
export class IntegrationApiService {
  constructor(
    private http: HttpService,
    private authServ: AuthService,
    @InjectRepository(Usuarios) readonly repository: Repository<Usuarios>,
  ) {}

  infoApi() {
    return {
      host: 'https://api-users-datapar.herokuapp.com',
      security: true,
      auth: { key:"apidatuser"},
      config: {
        ref: 'login_usuario',
        convert: {
          login: 'login_usuario',
          nombre: 'nombre_usuario',
        },
      },
    };
  }

  @Interval(10000)
  integrateApi() {
    //this.verifyData(this.readJSON());

    if (this.infoApi().security) {
      this.getToken().subscribe({
        next: (v: any) => {
          this.getDataFromApi(v.data.token).subscribe({
            next: (v: any) => this.verifyData(v.data),
            error: () => this.writeInLine('Error al traer los datos!'),
          });
        },
        error: () => this.writeInLine('Error al authenticarse con la api!'),
      });
    } else {
      this.getDataFromApi().subscribe({
        next: (v: any) => this.verifyData(v.data),
        error: () => this.writeInLine('Error al traer los datos!'),
      });
    }
  }

  getDataFromApi(token?: string): Observable<AxiosResponse<any[]>> {
    return this.http.get(this.infoApi().host + '/usuarios', {
      headers: { Authorization: `Bearer ` + token },
    });
  }

  getToken(): Observable<AxiosResponse<any[]>> {
    return this.http.post(this.infoApi().host + '/auth',
      this.infoApi().auth,
    );
  }

  //Metodo de verificacion
  async verifyData(data: Array<any>) {
    this.writeInLine('Verificion grupal...');

    const size = 100;
    const datas = [];
    for (let i = 0; i < data.length; i += size) {
      datas.push(data.slice(i, i + size));
    }

    let flag = false;
    for (let i = 0; i < datas.length && !flag; i++) {
      flag = await this.verifyGroup(this.infoApi().config.ref, datas[i]);

      this.writeProgressBar(Math.round((i * 100) / datas.length));
    }
    this.writeInLine(
      flag
        ? flag.toString() + ' nuevos elementos insertados!'
        : 'No hay elementos Nuevos!',
    );
    setTimeout(() => this.clearConsoleLine(), 3000);
    return flag ? true : false;
  }

  //verificacion de grupo
  async verifyGroup(field: string, datas: Array<any>) {
    let flag = false;

    const resp = await this.repository.find({
      where: { login: In(datas.map((v: any) => v[field])) },
    });

    const logins = resp.map((v) => v.login.toLowerCase());

    let result = datas.filter(
      (v) => v[field] && !logins.includes(v[field].toLowerCase()),
    );

    result = result.map((v) => this.convert(v));

    if (result.length > 0) {
      const users: Usuarios[] = this.repository.create(result);
      flag = await this.repository
        .save(users)
        .then(() => {
          return users.length;
        })
        .catch(() => {
          return null;
        });
    }

    return flag;
  }

  //convertir objeto a entidad
  convert(obj: any) {
    const converted: Usuarios = new Usuarios();
    for (const c in this.infoApi().config.convert) {
      converted[c] = obj[this.infoApi().config.convert[c]];
    }

    converted.fecha_creacion = new Date();
    converted.tipo_usuario = TipoUsuario.USUARIO;
    converted.descripcion = 'Integrado del API externo!';

    return converted;
  }

  readJSON() {
    return JSON.parse(fs.readFileSync('./userss.json', 'utf8'));
  }

  writeInLine(text: string) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write(text);
  }

  writeProgressBar(percent: number) {
    this.writeInLine('Verificando: ' + percent + ' %');
  }

  clearConsoleLine() {
    this.writeInLine('');
  }
}
