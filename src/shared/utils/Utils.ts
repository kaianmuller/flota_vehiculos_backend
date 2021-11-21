

export class Utils{


    static ipApi(){
        return '192.168.163.128:3000';
    }



    static convertToUpperCase(contex:any){
        for(let key in contex){
          if(contex[key] && typeof contex[key] == 'string' && key != 'login' && key != 'contrasena'){
            contex[key] = contex[key].toUpperCase();
          }
        }
      }




}