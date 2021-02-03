import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  interval
  conversations =[];
  currentUser 
  constructor(public fire: AngularFireAuth,
    public fDB: AngularFireDatabase,
    public authProvider :AuthProvider,
    public userProvider :UserProvider ,
     public formBuilder : FormBuilder,
     public navCtrl: NavController,
     public navParams: NavParams) 
  {


    this.currentUser = fire.auth.currentUser.uid; 

    this.getConversations();
    

}


openConversation(uid){

this.userProvider.setIdUser(uid);
this.navCtrl.push('ConversationPage');


}

getConversations(){
  firebase.database().ref(`/messages/`).orderByChild('schema').equalTo(this.currentUser).on('value',snapshot=>{

    
    snapshot.forEach(snap=>{
      firebase.storage().ref(snap.val().photURL).getDownloadURL().then(imgURL=>{

        this.conversations.push({
          photoURL :imgURL,
           firstName :snap.val().firstName,
          lastName :snap.val().lastName,
          text :snap.val().text,
          date :new Date( -1*(snap.val().date)).getHours()+':'+new Date(-1*(snap.val().date)).getMinutes(),
           talkwith :snap.val().talkwith
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
      };
  });
  
    
     });
  });
  

}
  

}
