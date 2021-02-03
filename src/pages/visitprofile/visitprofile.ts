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
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AngularFireStorage } from '@angular/fire/storage';
/**
 * Generated class for the VisitprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visitprofile',
  templateUrl: 'visitprofile.html',
})
export class VisitprofilePage  implements OnInit {

isliked :boolean ;
isjoined :boolean ;
currentUser
firstName 
lastName 
photoURL
imagePath 
city
timeline
 uid
 userData={
   firstName :'',
   lastName :'',
   birthDay :'',
     phoneNumber :'',
     about :'',
     city :'',
     adresse:'',
    followers :0,
    photoURL:'',
    
 };
 upload: any;
 likes=[];
 joinings=[];

 followers=[];
 followings=[];
 Timeline : any[];
 same =false;
countFollowing=0;
countFollowers=0;
imageProfil
  constructor(public afSG: AngularFireStorage,  public loadingController: LoadingController,public camera: Camera, public alertController: AlertController,public likesprovider :LikesProvider ,public modalCtrl: ModalController, public fire: AngularFireAuth,public likesProvider :LikesProvider ,public followProvider : FollowProvider ,public fDB: AngularFireDatabase, public authProvider :AuthProvider ,public userProvider :UserProvider ,public navCtrl: NavController, public navParams: NavParams) {
  this.uid = userProvider.getIdUser();
  this.currentUser = fire.auth.currentUser.uid;

    if(this.uid==this.currentUser){
     this.same =true;
    }

  console.log('currentUser', this.currentUser);

  console.log(this.uid);
  

 
  firebase.database().ref(`/users/${this.uid}`).on('value', snapshot =>{
   
      snapshot.forEach( snap =>{

        this.getUserData(snap);
              
        
          
      });
    });



    
  firebase.database().ref(`/users/${this.currentUser}`).on('value', snapshot =>{
   
    snapshot.forEach( snap =>{
            
       this.firstName = snap.val().firstName,
       this.lastName = snap.val().lastName,
       this.photoURL = snap.val().photoURL,
       this.city = snap.val().city
        this.imagePath = snap.val().photoURL
    });
  });


    firebase.database().ref(`/posts/`).orderByChild('author').equalTo(this.uid).on('value', snapshot =>{
      this.Timeline= [];
      
        snapshot.forEach( snap =>{
       
        this.getImagesStorage(snap);
        
      
      });
 
  });

  this.getFollowers();
  this.getFollowings();

}




  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitprofilePage');
  }



  ngOnInit() {

    this.timeline = 'globe';
   
   
    }


  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }


SendMessage(){
  
this.navCtrl.push('ConversationPage');

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
        // firebase.database().ref(`/posts/${idEvent}/totalLikes`).set(this.Timeline[index].totalLikes-1);
  
      }
    });
  }



  Like(idEvent, EventAuthor,AuthorFirstName,AuthorLastName,EventLocation){

  
 
    firebase.database().ref(`/liked/${idEvent}/${this.currentUser}`).push({
    
      
        uid :this.currentUser,
        firstName :this.firstName,
        lastName :this.lastName,
        photoURL :this.photoURL,
      
     
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
    //  firebase.database().ref(`/posts/${idEvent}/totalLikes`).set(this.Timeline[index].totalLikes+1);
 
 
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
    //  firebase.database().ref(`/posts/${idEvent}/joinings`).set(this.Timeline[index].joinings+1);
 
 
   }
 });
 


}


UnJoin(idEvent){
firebase.database().ref(`/joined/${idEvent}/${this.currentUser}`).remove(); 

firebase.database().ref(`/joinings/${this.currentUser}/${idEvent}`).remove(); 


this.Timeline.forEach((element,index)=>{

  if(element.key ===idEvent){
    this.Timeline[index].isJoined = false;
    // firebase.database().ref(`/posts/${idEvent}/joinings`).set(this.Timeline[index].joinings-1);

  }
});
}





isfollowed(){
  var isFollowed= false;
    firebase.database().ref(`/followings/${this.currentUser}/${this.uid}`).on('value',snapshot=>{
  
      snapshot.forEach(snap=>{
       isFollowed = true;
  
      })
    });
  return isFollowed;
                  
  }




  UnFollow(){
    firebase.database().ref(`/followed/${this.uid}/${this.currentUser}`).remove(); 
    
    firebase.database().ref(`/followings/${this.currentUser}/${this.uid}`).remove(); 
   
    
  }

  Follow(){
   
      firebase.database().ref(`/followed/${this.uid}/${this.currentUser}`).push({
      
        
          uid :this.currentUser,
         
       
      });
      firebase.database().ref(`/followings/${this.currentUser}/${this.uid}`).push({
         
          uid: this.uid,
          
     
   });
  
  

  }



getFollowers(){

 firebase.database().ref(`/followed/${this.uid}`).on('value',snapshot=>{
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
    photoURL:''
  };

  firebase.database().ref(`/users/${key}`).on('value',snapshot=>{

    snapshot.forEach(snap=>{
     firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgURL=>{
     
      userData.uid= snap.val().uid,
      userData.firstName=snap.val().firstName,
      userData.lastName=snap.val().lastName,
      userData.photoURL=imgURL

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



getFollowings(){

  firebase.database().ref(`/followings/${this.uid}`).on('value',snapshot=>{
   snapshot.forEach(snap=>{

      this.countFollowing =this.countFollowing +1;
     this.getData(snap.key);
 
     this.followings.push(this.getData(snap.key));
 
   });
 
  });
 
 }









VisitProfile(uid){

  this.userProvider.setIdUser(uid);
  console.log('recu de la form ', uid);
  this.navCtrl.push('VisitprofilePage');

 }



presentLikesModal(key) {
  let likesModal = this.modalCtrl.create(LikesPage, {key: key });
  likesModal.present();
}


presentJoiningsModal(key) {
  let joiningsModal = this.modalCtrl.create(JoiningsPage, {key: key });
  joiningsModal.present();
}




getImagesStorage(snap) {
 
  firebase.storage().ref(snap.val().photoEvent).getDownloadURL().then(imgUrl => {
 
    firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgUserUrl=>{

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
         joinings:snap.val().joinings,
         localisation: snap.val().localisation,
         photoURL: imgUserUrl,
         shares: snap.val().shares,
          text: snap.val().text,
          photoEvent : imgUrl,
          datedebut :snap.val().datedebut,
          time :snap.val().time
         
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
  
  



 }
 
 
getUserData(snap){

firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgUserUrl=>{

  this.userData.firstName = snap.val().firstName,
  this.userData.lastName = snap.val().lastName,
  this.userData.birthDay = snap.val().birthDay,
  this.userData.phoneNumber = snap.val().phoneNumber,
  this.userData.about  = snap.val().about,
  this.userData.city = snap.val().city,
  this.userData.adresse = snap.val().adresse,
  this.userData.followers = snap.val().followers,
  this.userData.photoURL = imgUserUrl


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








Delete(key){
  let alert = this.alertController.create({
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this event',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Delete',
        handler: () => {
          firebase.database().ref(`/posts/${key}`).remove(); 
          this.userProvider.setIdUser(this.currentUser);
          console.log('recu de la form ', this.currentUser);
          this.navCtrl.push('VisitprofilePage');
        }
      }
    ]
  });
  alert.present();
 
}


 async ChangePhoto(){

  const libraryImage = await this.OpenLibrary();
  this.imageProfil = 'data:image/jpg;base64,' + libraryImage;

}


 async OpenLibrary(){

  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 1000,
    targetHeight: 1000,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };
  return await this.camera.getPicture(options);
}



async uploadFirebase() {
  const loading = await this.loadingController.create();
  await loading.present();
  this.imagePath = 'Images/Users/'+ new Date().getTime() + '.jpg';

  this.upload = this.afSG.ref(this.imagePath).putString(this.imageProfil, 'data_url');
  this.upload.then(async () => {
    // this.image = 'https://i0.wp.com/brainstomping.com/wp-content/uploads/2010/10/theevent.png?ssl=1';

    await loading.dismiss();
     const alert = await this.alertController.create({
      title: 'Félicitation',
       message: 'Picture uploaded!',
       buttons: ['OK']
     });
     await alert.present();
  });
 


  firebase.database().ref(`/users/${this.currentUser}`).set({

    uid :this.currentUser,
    firstName : this.firstName,
    lastName : this.lastName,
    photoURL :this.imagePath,
    city :this.city
  });


}


}