import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
/*
  Generated class for the LikesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LikesProvider {

idPost
  constructor(public http: HttpClient) {
    console.log('Hello LikesProvider Provider');
  }


setPostId(idPost){
this.idPost =idPost;

}

getPostId(){
  
 return this.idPost;
}


  getLikingList(uidEvent){

    return firebase.database().ref(`/liked/${uidEvent}`);
         
  
  }
  
  
  getLikesList(uid){
   return  firebase.database().ref(`/likes/${uid}`);
        
  }
  
  
  getIfLiked(uidEvent,currentUser)
  {
     return firebase.database().ref(`/liked/${uidEvent}/${currentUser}`)
  
  }
  


}
