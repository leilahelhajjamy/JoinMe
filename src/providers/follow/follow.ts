import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
/*
  Generated class for the FollowProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FollowProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FollowProvider Provider');
  }

  

getFollowers(uid){

  return firebase.database().ref(`/followed/${uid}`);
       

}


getFollowingList(uid){
 return  firebase.database().ref(`/following/${uid}`);
      
}


getIfFollowing(uid,currentUser)
{
   return firebase.database().ref(`/followed/${uid}/${currentUser}`)

}






}
