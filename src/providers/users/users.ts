import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/database';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class UsersProvider {


 
  users
  userFirstName
  userLastName 
  constructor( public auth :AngularFireAuth,
      afDB: AngularFireDatabase,public http: HttpClient,private firestore: AngularFirestore) {
    console.log('Hello UsersProvider Provider');
    this.users = afDB.list('/users').valueChanges();


  
  }
  getAllUsers(){
   return firebase.database().ref(`/users/`);

  }
  getUserFirstName(){
    

    return  this.userFirstName;
  }

  getUserLastName(){
    

   return this.userLastName;

    
 
   
  }

  setUserData(uid){
    return firebase.database().ref(`/users/${uid}`).on('value', snapshot =>{
      this.userFirstName= '';
      this.userLastName = '';
        snapshot.forEach( snap =>{
              
          this.userFirstName = snap.val().firstName;
          this.userLastName  = snap.val().lastName;
          console.log('data set successfully');
          console.log('khedam');
          console.log(this.userLastName);
        });
      });


    
  }




  }



