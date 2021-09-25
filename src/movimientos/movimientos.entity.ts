import { EstadoMovimiento } from "src/enums/estado-movimiento.enum";
import { Servicios } from "src/servicios/servicios.entity";
import { EntityGeneric } from "src/shared/generic/EntityGeneric.entity";
import { Usuarios } from "src/usuarios/usuarios.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";


@Entity()
export class Movimientos extends EntityGeneric{


    @Column()
    fecha_inicio:Date;

    @Column({nullable:true})
    fecha_fin:Date;

    @Column()
    km_inicial:number;

    @Column({nullable:true})
    km_final:number;

    @Column()
    valor_servicio:number;

    @Column()
    estado:EstadoMovimiento;


    @ManyToOne(type => Servicios, servicio => servicio.movimientos)
    servicio:Servicios;

    @ManyToOne(type => Usuarios, usuario => usuario.movimientos)
    usuario:Usuarios;

}