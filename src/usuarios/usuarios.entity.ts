import { Exclude, classToPlain } from "class-transformer";
import { Agendamientos } from "src/agendamientos/agendamientos.entity";
import { TipoUsuario } from "src/enums/tipo-usuario.enum";
import { Servicios } from "src/servicios/servicios.entity";
import { EntityGeneric } from "src/shared/generic/entity-generic.entity";
import { Utils } from "src/shared/utils/Utils";
import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from "bcrypt";



@Entity()
export class Usuarios extends EntityGeneric{


    @Column()
    nombre:string;

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

     @BeforeInsert()
     @BeforeUpdate()
      async toUpperCase(){
         Utils.convertToFormat(this);
         this.id?this.fecha_alteracion = Utils.getDateNow():this.fecha_creacion = Utils.getDateNow();
      }

     async validarPassword(password:string){
        return await bcrypt.compareSync(password,this.contrasena);
     }


     toJSON() {
        return classToPlain(this);
      }

     
}