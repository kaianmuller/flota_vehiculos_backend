import { EstadoMovimientos } from "src/enums/estado-movimientos.enum";
import { Servicio } from "src/servicio/servicio.entity";
import { EntityGeneric } from "src/shared/generic/EntityGeneric";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";


@Entity()
export class Movimiento extends EntityGeneric{


    @Column()
    fechaInicio:Date;

    @Column({nullable:true})
    fechaFin:Date;

    @Column()
    kmInicial:number;

    @Column({nullable:true})
    kmFinal:number;

    @Column()
    valorServicio:number;

    @Column()
    estado:EstadoMovimientos;


    @ManyToOne(()=> Servicio, servicio => servicio.movimientos)
    servicio:Servicio;

    @ManyToOne(()=> Usuario, usuario => usuario.movimientos)
    usuario:Usuario;

}