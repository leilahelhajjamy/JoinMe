import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
/*
  Generated class for the CommentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CommentsProvider Provider');
  }




  getCommentsList(uidEvent){

    return firebase.database().ref(`/comments/${uidEvent}`);
         
  
  }
  

  
  
  


}
