import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
/*
  Generated class for the SharesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SharesProvider Provider');
  }





  getSharingList(uidEvent){

    return firebase.database().ref(`/shared/${uidEvent}`);
         
  
  }
  
  
  getSharesList(uid){
   return  firebase.database().ref(`/shares/${uid}`);
        
  }
  
  
  getIfShared(uidEvent,currentUser)
  {
     return firebase.database().ref(`/shared/${uidEvent}/${currentUser}`)
  
  }






}
