import { Component, OnDestroy, OnInit, Sanitizer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

/**
 * Generated class for the JoiningsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-joinings',
  templateUrl: 'joinings.html',
})
export class JoiningsPage {
  joinings=[];
  key
  constructor(public viewCtrl: ViewController,public params: NavParams,public modalCtrl: ModalController, public fire: AngularFireAuth,public likesProvider :LikesProvider ,public followProvider : FollowProvider ,public fDB: AngularFireDatabase, public authProvider :AuthProvider ,public userProvider :UserProvider ,public navCtrl: NavController, public navParams: NavParams) {
    this.key = params.get('key');
    this.seeJoinings(this.key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoiningsPage');
  }



  
  
  seeJoinings(key){
  
    firebase.database().ref(`/joined/${key}`).on('value',snapshot=>{
      snapshot.forEach(snap=>{
    
        this.getUserData(snap.key);
    
        this.joinings.push(this.getUserData(snap.key));
    
      });
    
     });
  
  }
  

  
  

  dismiss() {
    let data= { };
    this.viewCtrl.dismiss(data);
  }

  VisitProfile(uid){
    this.userProvider.setIdUser(uid);
    console.log('recu de la form ', uid);
    this.navCtrl.push('VisitprofilePage');

  }




  getUserData(key){

    var userData={
      uid :'',
      firstName :'',
      lastName :'',
      photoURL:''
    };
    firebase.database().ref(`/users/${key}`).on('value',snapshot=>{

    snapshot.forEach(snap=>{

      firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgUserUrl=>{
        userData.uid = snapshot.val().uid,
        userData.firstName = snap.val().firstName,
        userData.lastName = snap.val().lastName,
        userData.photoURL = imgUserUrl
      

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



}
