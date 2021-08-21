import { TipoUsuario } from "src/enums/tipo-usuario.enum";
import { Servicio } from "src/servicio/servicio.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Usuario{

    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    dataCreacion:Date;

    @Column()
    dataAlteracion:Date;

    @Column()
    nombre:string;

    @Column()
    login:string;

    @Column()
    contrasena:string;

    @Column()
    tipoUsuario:TipoUsuario;

    @OneToMany(() => Servicio, servicio => servicio.usuario,{ cascade: true })
     servicios: Array<Servicio>;
}