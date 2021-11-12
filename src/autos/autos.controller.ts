import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AutosDto } from './autos.dto';
import { Autos } from './autos.entity';
import { AutosService } from './autos.service';


@ApiTags('Autos')
@Controller('autos')
export class AutosController{

    constructor(private readonly service:AutosService){
    }
    



@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get('existAutoByChapa/:chapa')
async existAutoByChapa(@Param('chapa') chapa:string) {
    
        if(await this.service.getAutoByChapa(chapa)){
           return true; 
        }
    
        return false;
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get('count')
async getCount(){
    return await this.service.getCount();
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get()
async getAll(@Query() query:any){
    return await this.service.getAll(query);
}

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Get(':id')
async getOne(@Param('id') id:number){
    return await this.service.getOne(id);
}



@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Post()
async createOne(@Body() dto:AutosDto){
    return await this.service.createOne(dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Put(':id')
async editOne(@Param('id') id:number,@Body() dto:AutosDto){
    return await this.service.editOne(id,dto);
}


@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Delete(':id')
async deleteOne(@Param('id') id:number){
    return await this.service.deleteOne(id); 
}
    
    
    
    }
