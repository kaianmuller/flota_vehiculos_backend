import { TipoUsuario } from "src/enums/tipo-usuario.enum";
import { Servicio } from "src/servicio/servicio.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";



@Entity()
export class Usuario{

    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    dataCreacion:Date;

    @Column()
    dataAlteracion:Date;

    @Column()
    nombre:string;

    @Column()
    tipoUsuario:TipoUsuario;

    @OneToMany(() => Servicio, servicio => servicio.usuario,{ cascade: true })
     servicios: Array<Servicio>;

     @Column({unique: true})
     login:string;
 
     @Column({length: 70, nullable: true })
     contrasena:string;

     @BeforeInsert()
     async hashPassword(){
         const salt = await bcrypt.genSalt();
         this.contrasena = await bcrypt.hash(this.contrasena,salt);
     }

     async validarPassword(password:string){
        return await bcrypt.compareSync(password,this.contrasena);
     }

     
}