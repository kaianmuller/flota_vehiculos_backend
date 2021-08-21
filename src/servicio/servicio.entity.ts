import { Auto } from "src/auto/auto.entity";
import { TipoServicio } from "src/enums/tipo-servicio.enum";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Servicio{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    descripcion:string;

    @Column()
    tipoServicio:TipoServicio;

    @Column()
    valorServicio:number;

    @Column()
    fechaServicio:Date;

    @Column()
    kmInicial:number;

    @Column()
    kmFinal:number;

    @ManyToOne(type => Usuario, usuario => usuario.servicios)
    usuario:Usuario;

    @ManyToOne(type => Auto, auto => auto.servicios)
    auto:Auto;

    
}