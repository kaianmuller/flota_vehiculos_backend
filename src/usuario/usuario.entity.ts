import { TipoUsuario } from "src/enums/tipo-usuario.enum";
import { Servicio } from "src/servicio/servicio.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { EntityGeneric } from "src/shared/generic/EntityGeneric";
import { Movimiento } from "src/movimiento/movimiento.entity";



@Entity()
export class Usuario extends EntityGeneric{



    @Column()
    nombre:string;

     @Column({unique: true})
     login:string;
 
     
     @Column({length: 70, nullable: true})
     contrasena:string;
     
    @Column()
    tipoUsuario:TipoUsuario;

    
    @OneToMany(() => Servicio, servicio => servicio.usuarioCreador,{ cascade: true })
     servicios: Array<Servicio>;

     @OneToMany(() => Movimiento, movimiento => movimiento.usuario,{ cascade: true })
     movimientos: Array<Movimiento>;

     @BeforeInsert()
     async hashPassword(){
         const salt = await bcrypt.genSalt();
         this.contrasena = await bcrypt.hash(this.contrasena,salt);
     }

     async validarPassword(password:string){
        return await bcrypt.compareSync(password,this.contrasena);
     }

     
}