import { Component } from '@angular/core';
import { NavController ,IonicPage, NavParams, Nav} from 'ionic-angular';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';
import { ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage'
import { LikesProvider } from '../../providers/likes/likes';
import { LikesPage } from '../likes/likes';
import { JoiningsPage } from '../joinings/joinings';
import { AngularFireStorage } from '@angular/fire/storage';
import {Platform} from 'ionic-angular';
import { SharedlocationsPage } from '../sharedlocations/sharedlocations';
import { LocationProvider } from '../../providers/location/location';


/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  userlogged :any ;
  Events: any[];
  currentUser :string;
  firstName 
  lastName
  photoURL
  uid
 
  Locations =[];
  TopEvents=[];
  
  constructor( public locationProvider :LocationProvider ,public afSG: AngularFireStorage, public modalCtrl: ModalController,public likesProvider :LikesProvider ,private storage: Storage,public modalController: ModalController,public authProvider :AuthProvider,public userProvider :UserProvider,public nav :Nav,public fire: AngularFireAuth,public formBuilder : FormBuilder,public navCtrl: NavController,afDB: AngularFireDatabase,  
    public navParams: NavParams) {

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


              this.getImagesStorage();
              this.getSharedLocations();
  }



  VisitProfile(uid){

    this.userProvider.setIdUser(uid);
    console.log('recu de la form ', uid);
    this.navCtrl.push('VisitprofilePage');
 
   }

   isLiked(IdEvent){
    var isLiked= false;
      firebase.database().ref(`/likes/${this.currentUser}/${IdEvent}`).on('value',snapshot=>{
    
        snapshot.forEach(snap=>{
         isLiked = true;
    
        })
      });
    return isLiked;
               
        
    }


    UnLike(idEvent){
      firebase.database().ref(`/liked/${idEvent}/${this.currentUser}`).remove(); 
    
      firebase.database().ref(`/likes/${this.currentUser}/${idEvent}`).remove(); 
      
     
      this.Events.forEach((element,index)=>{
    
        if(element.key ===idEvent){
          this.Events[index].isLiked = false;
          // firebase.database().ref(`/posts/${idEvent}/totalLikes`).set(this.Events[index].totalLikes-1);
    
        }
      });
    }



    Like(idEvent, EventAuthor,AuthorFirstName,AuthorLastName,EventLocation){

    
   
      firebase.database().ref(`/liked/${idEvent}/${this.currentUser}`).push({
      
        
          uid :this.currentUser,
          firstName :this.firstName,
          lastName :this.lastName,
          photoURL :this.photoURL
       
      });
      firebase.database().ref(`/likes/${this.currentUser}/${idEvent}`).push({
         EventId :idEvent,
        EventAuthor: EventAuthor,
         AuthorFirstName : AuthorFirstName,
         AuthorLastName :AuthorLastName,
         EventLocation : EventLocation
     
   });
   
   this.Events.forEach((element,index)=>{
   
     if(element.key ===idEvent){
       this.Events[index].isLiked = true;
      //  firebase.database().ref(`/posts/${idEvent}/totalLikes`).set(this.Events[index].totalLikes+1);
   
   
     }
   });
   
     
   }



   isJoined(IdEvent){
    var isJoined= false;
      firebase.database().ref(`/joinings/${this.currentUser}/${IdEvent}`).on('value',snapshot=>{
    
        snapshot.forEach(snap=>{
         isJoined = true;
    
        })
      });
    return isJoined;
                    
    }




   Join(idEvent, EventAuthor,AuthorFirstName,AuthorLastName,EventLocation){

    
      firebase.database().ref(`/joined/${idEvent}/${this.currentUser}`).push({
      
        
          uid :this.currentUser,
          firstName :this.firstName,
          lastName :this.lastName,
          photoURL :this.photoURL
       
      });
      firebase.database().ref(`/joinings/${this.currentUser}/${idEvent}`).push({
         EventId :idEvent,
          EventAuthor: EventAuthor,
         AuthorFirstName : AuthorFirstName,
         AuthorLastName :AuthorLastName,
         EventLocation : EventLocation
     
   });
   
   
   
   
   this.Events.forEach((element,index)=>{
   
     if(element.key ===idEvent){
       this.Events[index].isJoined = true;
      //  firebase.database().ref(`/posts/${idEvent}/joinings`).set(this.Events[index].joinings+1);
   
   
     }
   });
   


}


UnJoin(idEvent){
  firebase.database().ref(`/joined/${idEvent}/${this.currentUser}`).remove(); 

  firebase.database().ref(`/joinings/${this.currentUser}/${idEvent}`).remove(); 
  
 
  this.Events.forEach((element,index)=>{

    if(element.key ===idEvent){
      this.Events[index].isJoined = false;
      // firebase.database().ref(`/posts/${idEvent}/joinings`).set(this.Events[index].joinings-1);

    }
  });
}

Messages(){
  this.navCtrl.push('MessagesPage');
}




presentLikesModal(key) {
  let likesModal = this.modalCtrl.create(LikesPage, {key: key });
  likesModal.present();
}


presentJoiningsModal(key) {
  let joiningsModal = this.modalCtrl.create(JoiningsPage, {key: key });
  joiningsModal.present();
}


getImagesStorage() {

firebase.database().ref(`/posts/`).orderByChild('createdAt').on('value', snapshot =>{

 this.Events= [];
          
 snapshot.forEach( snap =>{
           
 firebase.storage().ref(snap.val().photoEvent).getDownloadURL().then(imgUrl => {

  firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgUserUrl=>{

   
    this.Events.push({ 
    
      isLiked :true,
      isJoined :true,
      author:snap.val().author,
      firstName :snap.val().firstName,
      lastName :snap.val().lastName,
      key :snap.key,    
       comments: snap.val().comments,
       createdAt: snap.val().createdAt,
       joinings: snap.val().joinings,
       likes: snap.val().likes,
       localisation: snap.val().localisation,
       photoURL: imgUserUrl,
       shares: snap.val().shares,
        text: snap.val().text,
        photoEvent : imgUrl,
        datedebut :snap.val().datedebut,
        time :snap.val().time,
        city :snap.val().city
       
      });
 
  
});  
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




getTotalLikes(idEvent){

  var totalLikes = 0 ;
    firebase.database().ref(`/liked/${idEvent}`).on('value',snapshot=>{
  
      snapshot.forEach(snap=>{
        totalLikes =totalLikes+1;
      });
    });
    return totalLikes;
  }
  
  
  
  getTotalJoinings(idEvent){
    var totalJoinings =0;
    firebase.database().ref(`/joined/${idEvent}`).on('value',snapshot=>{
  
      snapshot.forEach(snap=>{
        totalJoinings = totalJoinings+1;
      });
    });
    return totalJoinings;
  
  }
  



getSharedLocations() {

    firebase.database().ref(`/sharedlocations/`).orderByChild('date').on('value', snapshot =>{
    
     this.Locations= [];
              
     snapshot.forEach( snap =>{
               
      firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgUserUrl=>{
    
        this.Locations.push({ 
          idLocation : snap.val().idLocation,
          author:snap.val().author,
          firstName :snap.val().firstName,
          lastName :snap.val().lastName,    
          date: snap.val().date,
          adresse: snap.val().adresse,
          photoURL: imgUserUrl,
          description :snap.val().description
          
      });
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





seeDetailsLocations(idLocation){

this.locationProvider.setIdLocation(idLocation);
this.navCtrl.push('SharedlocationsPage');

}


ShareLocation(){

  this.navCtrl.push('SharelocationPage');
  
}


    
    

}