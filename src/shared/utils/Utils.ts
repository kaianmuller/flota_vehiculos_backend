import moment from "moment";


export class Utils{


  
    static isEmpty(obj:any){
      return !(obj && Object.values(obj).length !== 0);
    }

    static convertToFormat(context:any){
        for(let key in context){
          if(context[key] && typeof context[key] == 'string' && key != 'login' && key != 'contrasena'){
            context[key] = context[key].toUpperCase();
          }
            
        }
      }



  static getDate(){
      let fecha = new Date();
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
      return fecha;
  }


  static getDateZeroHours(date?:Date){
    let fecha = date?new Date(date):new Date();
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
    fecha.setHours(0,0,0,0);
    return fecha;
}


static getTimeStart(op:string,date?:Date){
  let fecha = Utils.getDateZeroHours(date);
  var primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);

  switch(op){
    case 'M':{
      return new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    }
    case 'Y':{
      return new Date(fecha.getFullYear(), 0, 1);
    }
  }
}


static getTimeEnd(op:string,date?:Date){
  let fecha = Utils.getDateZeroHours(date);

  switch(op){
    case 'M':{
      return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
    }
    case 'Y':{
      return new Date(fecha.getFullYear()+1, 0, 0);
    }
  }
}


static getDateWithObj(obj:any){
  let year = obj.year?obj.year:'';
  let month = obj.month?obj.month:'';
  let fecha = new Date(year+'-'+month);
  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
  fecha.setHours(0,0,0,0);
  return fecha;
}




  static getAuthorizationToken(headers:any){
  return headers.authorization.split(" ")[1];
  }




}
