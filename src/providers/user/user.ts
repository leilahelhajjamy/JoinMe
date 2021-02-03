import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  firstName
  lastName
  uid
  city
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

setName(firstName,lastName){

this.firstName =firstName;

this.lastName =lastName;
}
getFirstName(){
return this.firstName;

}

getLastName(){
  
return this.lastName;

}

setIdUser(uid){

  this.uid =uid;
  console.log('user id set ', this.uid);
}

getIdUser(){
  return this.uid;
}

setCity(city){

  this.city =city;
}


getCity(){
  return this.city;
}
}
