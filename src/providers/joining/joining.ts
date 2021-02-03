import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

/*
  Generated class for the JoiningProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JoiningProvider {

  constructor(public http: HttpClient) {
    console.log('Hello JoiningProvider Provider');
  }





 

  getJoinedList(uidEvent){

    return firebase.database().ref(`/joined/${uidEvent}`);
         
  
  }
  
  
  getJoiningList(uid){
   return  firebase.database().ref(`/joining/${uid}`);
        
  }
  
  
  getIfJoined(uidEvent,currentUser)
  {
     return firebase.database().ref(`/joined/${uidEvent}/${currentUser}`)
  
  }
  
  
  






}
