

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



  static getDateNow(){
    let fecha = new Date();
    return new Date(fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset()));
  }


  static getAuthorizationToken(headers:any){
  return headers.authorization.split(" ")[1];
  }


}