
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber } from "class-validator";
import { EstadoMovimiento } from "src/enums/estado-movimiento.enum";
import { DtoGeneric } from "src/shared/generic/DtoGeneric.dto";





export class ServiciosDto extends DtoGeneric{


    @ApiProperty()
    @Type(()=>Date)
    fecha_inicio:Date;

    @ApiProperty()
    @Type(()=>Date)
    fecha_fin:Date;

    @ApiProperty()
    @IsNumber()
    km_inicial:number;

    @ApiProperty()
    @IsNumber()
    km_final:number;


    @ApiProperty()
    @IsNumber()
    valor_servicio:number;

    @ApiProperty()
    @IsEnum(EstadoMovimiento)
    estado:EstadoMovimiento;

}