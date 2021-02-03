import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { UsersProvider } from '../../providers/users/users';
import { UserProvider } from '../../providers/user/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EventProvider } from '../../providers/event/event';
import { LikesPage } from '../likes/likes';
import { JoiningsPage } from '../joinings/joinings';
/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
idEvent
Event={
  isLiked :true,
  isJoined :true,
  author:'',
  firstName :'',
  lastName :'',
  key :'',    
   comments: '',
   createdAt: '',
   joinings: '',
   likes:'',
   localisation: '',
   photoURL:'',
   shares: '',
    text: '',
    photoEvent :'',
    datedebut :'',
    time :'',
    city :''

}

currentUser
firstName
lastName
photoURL
  constructor( public modalController: ModalController,public fire: AngularFireAuth,public eventProvider :EventProvider,public formBuilder : FormBuilder,public userProvider :UserProvider , public usersProvider :UsersProvider , afDB: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
 
  this.idEvent=this.eventProvider.getIdEvent();

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


}



  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }
  ngOnInit() {
 
    
    }



    getImagesStorage() {

      firebase.database().ref(`/posts/`).orderByChild('idEvent').equalTo(this.idEvent).on('value', snapshot =>{
      
     
                
       snapshot.forEach( snap =>{
                 
       firebase.storage().ref(snap.val().photoEvent).getDownloadURL().then(imgUrl => {
      
        firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgUserUrl=>{
      
        
       
      
          this.Event.isLiked =true;
          this.Event.isJoined =true;
          this.Event.author=snap.val().author;
          this.Event.firstName =snap.val().firstName;
          this.Event.lastName =snap.val().lastName;
          this.Event.key =snap.key;    
    
          this.Event.createdAt= snap.val().createdAt;
      
          this.Event.localisation= snap.val().localisation;
          this.Event.photoURL= imgUserUrl;
      
          this.Event.text= snap.val().text;
          this.Event.photoEvent = imgUrl;
          this.Event.datedebut =snap.val().datedebut;
          this.Event.time =snap.val().time;
          this.Event.city =snap.val().city;
             
            
       
        
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
    
   
    this.Event.isLiked = false;
       
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
 
 this.Event.isLiked = true;
  
   
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
 
 

 this.Event.isJoined = true;
   

}


UnJoin(idEvent){
firebase.database().ref(`/joined/${idEvent}/${this.currentUser}`).remove(); 

firebase.database().ref(`/joinings/${this.currentUser}/${idEvent}`).remove(); 


this.Event.isJoined = false;
  
}



presentLikesModal(key) {
  let likesModal = this.modalController.create(LikesPage, {key: key });
  likesModal.present();
}


presentJoiningsModal(key) {
  let joiningsModal = this.modalController.create(JoiningsPage, {key: key });
  joiningsModal.present();
}



invite(idEvent){

  this.eventProvider.setIdEvent(idEvent);
  this.navCtrl.push('InvitePage');  
    
  }

}
