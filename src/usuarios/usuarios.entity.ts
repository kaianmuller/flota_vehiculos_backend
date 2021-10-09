import { TipoUsuario } from "src/enums/tipo-usuario.enum";
import { BeforeInsert, BeforeUpdate, Column, Entity, Exclusion, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { EntityGeneric } from "src/shared/generic/EntityGeneric.entity";
import { classToPlain, Exclude } from "class-transformer";
import { Servicios } from "src/servicios/servicios.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Agendamientos } from "src/agendamientos/agendamientos.entity";



@Entity()
export class Usuarios extends EntityGeneric{



    @Column()
    nombre:string;

    @ApiProperty()
     @Column({unique: true})
     login:string;
 

    @Exclude({ toPlainOnly: true})
    @Column({length: 70, nullable: true})
    contrasena:string;
     
    @Column()
    tipo_usuario:TipoUsuario;

     @OneToMany(type => Servicios, servicio => servicio.usuario,{ cascade: true })
     servicios: Array<Servicios>;

     @OneToMany(type=>Agendamientos,agendamientos=>agendamientos.usuario,{cascade:true})
     agendamientos:Array<Agendamientos>;

     @BeforeInsert()
     @BeforeUpdate()
     async hashPassword(){
         if(!this.contrasena){
            this.contrasena = this.login;
         }
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