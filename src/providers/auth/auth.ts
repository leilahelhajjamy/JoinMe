import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase,AngularFireList  } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'firebase/database';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
 firstName
 lastName 
  name;
  email; 
  uid; 
 
  constructor(public fire: AngularFireAuth, public fDB: AngularFireDatabase,  
  public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
    var user = fire.auth.currentUser; 
    if (user != null) {
     
      this.email = user.email;
      this.uid = user.uid;  
      console.log(user.uid,'is logged in');
      firebase.database().ref(`/users/${this.uid}`).on('value', snapshot =>{
        
          snapshot.forEach( snap =>{
                    
             this.firstName= snap.val().firstName,
             this.lastName= snap.val().lastName
             
            
          });
        });
        
    }

 


  }
  getEmail(){

  return this.email;
    
  }
  getId(){

    return this.uid;
      
    }
    
  getUserFirstName(){
    
    return this.firstName ;
  }
  getUserLastName(){
    
    return this.lastName ;
  }


 


}
