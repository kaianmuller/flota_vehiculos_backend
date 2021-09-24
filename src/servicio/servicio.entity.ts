
import { Auto } from "src/auto/auto.entity";
import { Movimiento } from "src/movimiento/movimiento.entity";
import { EntityGeneric } from "src/shared/generic/EntityGeneric";
import { TipoServicio } from "src/tipo-servicio/tipo-servicio.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Servicio extends EntityGeneric{


    @ManyToOne(type => TipoServicio, tipoServicio => tipoServicio.servicios)
    tipoServicio:string;

    @ManyToOne(type => Usuario, usuario => usuario.servicios)
    usuarioCreador:Usuario;

    @ManyToOne(type => Auto, auto => auto.servicios)
    auto:Auto;

    @OneToMany(type =>Movimiento,movimiento=>movimiento.servicio,{cascade:true})
    movimientos:Array<Movimiento>

    
}