import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
idEvent
  constructor(public http: HttpClient) {
    console.log('Hello EventProvider Provider');
  }

setIdEvent(id){
this.idEvent =id;

}

getIdEvent(){

return this.idEvent;

}




}
