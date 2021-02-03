import { Component, OnDestroy, OnInit, Sanitizer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FollowProvider } from '../../providers/follow/follow';
import { LikesProvider } from '../../providers/likes/likes';
import { AngularFireAuth } from '@angular/fire/auth';
import { getScrollData } from 'ionic-angular/umd/components/input/input';
/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage implements OnInit {

  
isliked :boolean ;
isjoined :boolean ;

firstName 
lastName 
photoURL 
currentUser


followers=[];
followings=[];
Timeline= [];
timeline 
  constructor(public fire: AngularFireAuth,public likesProvider :LikesProvider ,public followProvider : FollowProvider ,public fDB: AngularFireDatabase, public authProvider :AuthProvider ,public userProvider :UserProvider ,public navCtrl: NavController, public navParams: NavParams) {
 
    this.currentUser = fire.auth.currentUser.uid;
    firebase.database().ref(`/users/${this.currentUser}`).on('value', snapshot =>{
   
      snapshot.forEach( snap =>{
              
         this.firstName = snap.val().firstName,
         this.lastName = snap.val().lastName,
         this.photoURL = snap.val().photoURL
       
      });
    });
 


    
    firebase.database().ref(`/posts/`).orderByChild('author').equalTo(this.currentUser).on('value', snapshot =>{
      this.Timeline= [];
      
        snapshot.forEach( snap =>{
       
          this.Timeline.push({ 
            totalLikes :snap.val().totalLikes,
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
             photoURL: snap.val(). photoURL,
             shares: snap.val().shares,
              text: snap.val().text
             
             
              
        });
      
      });


    
  });

 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }



  ngOnInit() {

    this.timeline = 'globe';
   
   
    }


  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
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
      
     
      this.Timeline.forEach((element,index)=>{
    
        if(element.key ===idEvent){
          this.Timeline[index].isLiked = false;
          firebase.database().ref(`/posts/${idEvent}/totalLikes`).set(this.Timeline[index].totalLikes-1);
    
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
   
   this.Timeline.forEach((element,index)=>{
   
     if(element.key ===idEvent){
       this.Timeline[index].isLiked = true;
       firebase.database().ref(`/posts/${idEvent}/totalLikes`).set(this.Timeline[index].totalLikes+1);
   
   
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
   
   
   
   
   this.Timeline.forEach((element,index)=>{
   
     if(element.key ===idEvent){
       this.Timeline[index].isJoined = true;
       firebase.database().ref(`/posts/${idEvent}/joinings`).set(this.Timeline[index].joinings+1);
   
   
     }
   });
   
  
  
  }
  
  
  UnJoin(idEvent){
  firebase.database().ref(`/joined/${idEvent}/${this.currentUser}`).remove(); 
  
  firebase.database().ref(`/joinings/${this.currentUser}/${idEvent}`).remove(); 
  
  
  this.Timeline.forEach((element,index)=>{
  
    if(element.key ===idEvent){
      this.Timeline[index].isJoined = false;
      firebase.database().ref(`/posts/${idEvent}/joinings`).set(this.Timeline[index].joinings-1);
  
    }
  });
  }
  
  

  getFollowers(){

    firebase.database().ref(`/followed/${this.currentUser}`).on('value',snapshot=>{
     snapshot.forEach(snap=>{
   
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
       photoURL:''
     };
     firebase.database().ref(`/users/${key}`).on('value',snapshot=>{
   
       snapshot.forEach(snap=>{
        
   
         userData.uid= snap.val().uid,
         userData.firstName=snap.val().firstName,
         userData.lastName=snap.val().lastName,
         userData.photoURL=snap.val().photoURL
   
        
   
       });
     });
   
     return userData;
   
   }
   
   
   
   getFollowings(){
   
     firebase.database().ref(`/followings/${this.currentUser}`).on('value',snapshot=>{
      snapshot.forEach(snap=>{
    
        this.getData(snap.key);
    
        this.followings.push(this.getData(snap.key));
    
      });
    
     });
    
    }
   




}
