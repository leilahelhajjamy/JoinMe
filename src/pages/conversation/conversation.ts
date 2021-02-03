import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Content ,NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';
/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})

export class ConversationPage implements OnInit ,OnDestroy{
  
  @ViewChild('content') private content: any;
  interval: any;
  intervall :any;
  intervalll :any ;
  formMessage : FormGroup;
  Message
  public messages: any = [];
  public messagesExistants: any = [];
  public messageExist ;
connected 


uid
userfirstName
userlastName
userphotoURL
now = -1 * new Date().getTime();
Now = firebase.database.ServerValue.TIMESTAMP;

currentUser
currentUserfirstName
currentUserlastName
currentUserphotoURL

  constructor(public fire: AngularFireAuth,
    public fDB: AngularFireDatabase,
    public authProvider :AuthProvider,
    public userProvider :UserProvider ,
     public formBuilder : FormBuilder,
     public navCtrl: NavController,
     public navParams: NavParams) {
    this.uid = userProvider.getIdUser();
    console.log('recipient',this.uid);
    this.currentUser = fire.auth.currentUser.uid; 
    console.log('sender',this.currentUser);
    console.log(this.now);

 this.connected = true;

 firebase.database().ref(`/users/${this.uid}`).on('value', snapshot =>{
   
  snapshot.forEach( snap =>{
          
     this.userfirstName = snap.val().firstName,
     this.userlastName = snap.val().lastName,
     this.userphotoURL= snap.val().photoURL
        
  });
});




firebase.database().ref(`/users/${this.currentUser}`).on('value', snapshot =>{
   
  snapshot.forEach( snap =>{
          
     this.currentUserfirstName = snap.val().firstName,
     this.currentUserlastName = snap.val().lastName,
     this.currentUserphotoURL= snap.val().photoURL
        
  });
});





this.getMessagesExistants();
this.getMessages();



 this.formMessage = this.formBuilder.group({
  Message : new FormControl('', Validators.compose([
      Validators.required
  ]))
   
  });

  }

 
  ngOnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.intervall);
    
    clearInterval(this.intervalll);

  }

 
  ngOnInit(){
  

  this.getMessages();
        this.interval = setInterval(() => { 
            this.getMessages(); 
        }, 1000);

  this.getMessagesExistants();
  this.intervall = setInterval(() => { 
  this.getMessagesExistants(); 
  }, 1000);

   this.scrollToBottomOnInit();
     this.intervalll = setInterval(() => { 
       this.scrollToBottomOnInit();
   }, 300);

}



scrollHandler(event) {
  console.log(`ScrollEvent: ${event}`);
  clearInterval(this.intervalll);
  
}

scrollToBottomOnInit() {
    
    this.content.scrollToBottom(300);    
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
    this.scrollToBottomOnInit();
 
   
  }


  SendMessage(){
    
   firebase.database().ref(`/conversation/${this.uid}${this.currentUser}`).push({
        recipient: this.uid,
        text: this.Message,
        date: this.Now,
        sender :this.currentUser
      });
    

      firebase.database().ref(`/messages/${this.currentUser}${this.uid}`).set({
        talkwith:this.uid,
        text :this.Message,
        date : this.now,
        schema :this.currentUser,
        firstName :this.userfirstName,
        lastName :this.userlastName,
        photURL :this.userphotoURL
      });

      firebase.database().ref(`/messages/${this.uid}${this.currentUser}`).set({
        schema :this.uid,
        text :this.Message,
        date : this.now,
        talkwith :this.currentUser,
        firstName :this.currentUserfirstName,
        lastName :this.currentUserlastName,
        photURL :this.currentUserphotoURL
      });

      this.scrollToBottomOnInit();
       this.intervalll = setInterval(() => { 
         this.scrollToBottomOnInit();
     }, 300);
    
      this.Message = '';
  
  }

SendMessageExistant(){

  firebase.database().ref(`/conversation/${this.currentUser}${this.uid}`).push({
    recipient: this.uid,
    text: this.Message,
    date:  this.Now,
    sender :this.currentUser
  });
  
  firebase.database().ref(`/messages/${this.currentUser}${this.uid}`).set({
    talkwith:this.uid,
    text :this.Message,
    date : this.now,
    schema :this.currentUser,
    firstName :this.userfirstName,
    lastName :this.userlastName,
    photURL :this.userphotoURL
  });

  firebase.database().ref(`/messages/${this.uid}${this.currentUser}`).set({
    schema :this.uid,
    text :this.Message,
    date :  this.now,
    talkwith :this.currentUser,
    firstName :this.currentUserfirstName,
    lastName :this.currentUserlastName,
    photURL :this.currentUserphotoURL
  });


  this.scrollToBottomOnInit();
   this.intervalll = setInterval(() => { 
        this.scrollToBottomOnInit();
    }, 300);

  this.Message = '';


}
  



    getMessages() {
 
   firebase.database().ref(`/conversation/${this.uid}${this.currentUser}`).orderByChild('date').on('value', snapshot =>{
     
         this.messages= [];
      
         snapshot.forEach( snap =>{

       
          
             this.messages.push({          
              text: snap.val().text,
             date: snap.val().date,
             sender: snap.val().sender    
         }); 
       });
   });
  
 

  } 
  
getMessagesExistants(){

   firebase.database().ref(`/conversation/${this.currentUser}${this.uid}`).orderByChild('date').on('value', snapshot =>{
     
     this.messagesExistants= [];
  
     snapshot.forEach( snap =>{
     
      
     this.messageExist =true;
         this.messagesExistants.push({          
          text: snap.val().text,
         date: snap.val().date,
         sender: snap.val().sender    
     }); 
   });
 });
 

}


Messages(){

  this.navCtrl.push('MessagesPage');
}


VisitProfile(uid){

  this.userProvider.setIdUser(uid);
  this.navCtrl.push('VisitprofilePage');

 }


}
