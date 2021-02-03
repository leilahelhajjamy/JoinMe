import { Component, OnDestroy, OnInit, Sanitizer } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FollowProvider } from '../../providers/follow/follow';
import { LikesProvider } from '../../providers/likes/likes';
import { AngularFireAuth } from '@angular/fire/auth';
import { getScrollData } from 'ionic-angular/umd/components/input/input';
import { ModalController } from 'ionic-angular';
import { LikesPage } from '../likes/likes';
import { JoiningsPage } from '../joinings/joinings';
import { EditeventPage } from '../editevent/editevent';


import { AngularFireStorage } from '@angular/fire/storage';
import { EventProvider } from '../../providers/event/event';
import { LoginPage } from '../login/login';

/**
 * Generated class for the InvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {
idEvent
userlogged
followers=[];
countFollowers
currentUser
firstName
lastName
photoURL
selected =[];
now = -1 * new Date().getTime();
  constructor(public fire: AngularFireAuth,public eventProvider : EventProvider , public navCtrl: NavController, public navParams: NavParams) {
  
  this.idEvent = eventProvider.getIdEvent();
    
  this.userlogged= fire.auth.onAuthStateChanged(function(user) {
    if (user) {
      
      console.log(user.uid,'user logged in');
     navCtrl.push('WelcomePage');
   
    } else {
      console.log('You should log in');
      navCtrl.setRoot(LoginPage);
      
    }
  });
  

  var currentUser = fire.auth.currentUser; 
  if (currentUser != null) {
    this.currentUser = currentUser.uid; 
    
    console.log(currentUser);
    firebase.database().ref(`/users/${this.currentUser}`).on('value', snapshot =>{
      this.firstName= '';
      this.lastName = '';
      this.photoURL='';
        snapshot.forEach( snap =>{
              
          firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgUserUrl=>{
 
           this.firstName = snap.val().firstName,
            this.lastName = snap.val().lastName,
            this.photoURL = imgUserUrl
           
          
        }).catch(function(error) {

          switch (error.code) {
            case 'storage/object-not-found':
              console.log('File doesnt exist') ;
              break;
        
            case 'storage/unauthorized':
              console.log("User doesnt have permission to access the object");
              break;
        
            case 'storage/canceled':
              console.log('User canceled the upload');
              break;
        
          
            case 'storage/unknown':
             console.log('Unknown error occurred, inspect the server response');
              break;
          }
        });
      });
    }); 
  }
  
this.getFollowers();  


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
  }



  getFollowers(){

    firebase.database().ref(`/followed/${this.currentUser}`).on('value',snapshot=>{
     snapshot.forEach(snap=>{
   
       this.countFollowers =this.countFollowers+1;
       this.getData(snap.key);
   
       this.followers.push(this.getData(snap.key));
   
     });
   
    });
   
   }
   
   
   
   
   getData(key){
   
     var userData={
       uid :'',
       firstName :'',
       lastName :'',
       photoURL:'',
       selected :false
     };
   
     firebase.database().ref(`/users/${key}`).on('value',snapshot=>{
   
       snapshot.forEach(snap=>{
        firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgURL=>{
        
         userData.uid= snap.val().uid,
         userData.firstName=snap.val().firstName,
         userData.lastName=snap.val().lastName,
         userData.photoURL=imgURL,
         userData.selected = false 
   
        }).catch(function(error) {
     
         switch (error.code) {
           case 'storage/object-not-found':
             console.log('File doesnt exist') ;
             break;
       
           case 'storage/unauthorized':
             console.log("User doesnt have permission to access the object");
             break;
       
           case 'storage/canceled':
             console.log('User canceled the upload');
             break;
       
         
           case 'storage/unknown':
            console.log('Unknown error occurred, inspect the server response');
             break;
         };
     });
   
       });
     });
   
     return userData;
   
   }


Select(uid,firstName,lastName,photoURL){

  this.selected.push({
    uid :uid,
    firstName :firstName,
    lastName :lastName,
    photoURL :photoURL,
    
  }) 
 
  this.followers.forEach((element,index)=>{

    if(element.uid===uid){
      this.followers[index].selected = true;
    }
  })

}

unSelect(uid){

this.selected.forEach((element,index)=>{

  if(element.uid ===uid){

    this.selected.splice(index,1);
  }
})

this.followers.forEach((element,index)=>{

  if(element.uid===uid){
    this.followers[index].selected = false;
  }
})


}


Send(){

this.selected.forEach((element,index)=>{

firebase.database().ref(`/invitations/${element.uid}`).push({
senderUid:this.currentUser,
senderFirstName :this.firstName,
senderLastName :this.lastName,
senderPhotoURL :this.photoURL,
idEvent :this.idEvent,
invited :element.uid,
date :this.now
})
})

this.navCtrl.push('AcceuilPage');
}




}
