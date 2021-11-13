
import { Autos } from "src/autos/autos.entity";
import { EstadoServicio } from "src/enums/estado-servicio.enum";
import { EntityGeneric } from "src/shared/generic/entity-generic.entity";
import { TiposServicio } from "src/tipos-servicio/tipos-servicio.entity";
import { Usuarios } from "src/usuarios/usuarios.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Servicios extends EntityGeneric{

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
    estado:EstadoServicio;

    
    @ManyToOne(type => TiposServicio, tipo_servicio => tipo_servicio.servicios)
    tipo_servicio:TiposServicio;

    @ManyToOne(type => Autos, auto => auto.servicios)
    auto:Autos;

    @ManyToOne(type => Usuarios, usuario => usuario.servicios)
    usuario:Usuarios;
    
}