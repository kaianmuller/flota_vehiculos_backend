
import { Agendamientos } from "src/agendamientos/agendamientos.entity";
import { Autos } from "src/autos/autos.entity";
import { Movimientos } from "src/movimientos/movimientos.entity";
import { EntityGeneric } from "src/shared/generic/EntityGeneric.entity";
import { TiposServicio } from "src/tipos-servicio/tipos-servicio.entity";
import { Usuarios } from "src/usuarios/usuarios.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Servicios extends EntityGeneric{


    @ManyToOne(type => TiposServicio, tipoServicio => tipoServicio.servicios)
    tipo_servicio:string;

    @ManyToOne(type => Usuarios, usuario => usuario.servicios)
    usuario_creador:Usuarios;

    @ManyToOne(type => Autos, auto => auto.servicios)
    auto:Autos;

    @OneToMany(type =>Movimientos,movimiento=>movimiento.servicio,{cascade:true})
    movimientos:Array<Movimientos>

    @OneToOne(type => Agendamientos,agendamiento => agendamiento.servicio,{cascade:true})
    agendamiento:Agendamientos;

    
}