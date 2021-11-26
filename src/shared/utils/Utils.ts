

export class Utils{


  
    static isEmpty(obj:any){

      if(obj && Object.values(obj).length !== 0){
        return false;
      }
      return true;
    }

    static convertToFormat(context:any){
        for(let key in context){
          if(context[key] && typeof context[key] == 'string' && key != 'login' && key != 'contrasena'){
            context[key] = context[key].toUpperCase();
          }
            
        }
      }



  static getDateNow(){
    let fecha = new Date()
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
  }


}