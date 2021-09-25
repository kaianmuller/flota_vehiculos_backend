import { TipoUsuario } from "src/enums/tipo-usuario.enum";
import { BeforeInsert, Column, Entity, Exclusion, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { EntityGeneric } from "src/shared/generic/EntityGeneric.entity";
import { classToPlain, Exclude } from "class-transformer";
import { IsOptional } from "class-validator";
import { Movimientos } from "src/movimientos/movimientos.entity";
import { Servicios } from "src/servicios/servicios.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity()
export class Usuarios extends EntityGeneric{



    @Column()
    nombre:string;

    @ApiProperty()
     @Column({unique: true})
     login:string;
 

    @Exclude({ toPlainOnly: true })
    @Column({length: 70, nullable: true})
    contrasena:string;
     
    @Column()
    tipo_usuario:TipoUsuario;

    
    
    @OneToMany(type => Servicios, servicio => servicio.usuario_creador,{ cascade: true })
     servicios: Array<Servicios>;

     @OneToMany(type => Movimientos, movimiento => movimiento.usuario,{ cascade: true })
     movimientos: Array<Movimientos>;

     @BeforeInsert()
     async hashPassword(){
         const salt = await bcrypt.genSalt();
         this.contrasena = await bcrypt.hash(this.contrasena,salt);
     }

     async validarPassword(password:string){
        return await bcrypt.compareSync(password,this.contrasena);
     }


     toJSON() {
        return classToPlain(this);
      }

     
}