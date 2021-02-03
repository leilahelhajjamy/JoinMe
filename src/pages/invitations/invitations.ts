import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Content ,NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { EventProvider } from '../../providers/event/event';
/**
 * Generated class for the InvitationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitations',
  templateUrl: 'invitations.html',
})
export class InvitationsPage {
currentUser
Invitations=[];

  constructor(public fire: AngularFireAuth,
    public fDB: AngularFireDatabase,
    public authProvider :AuthProvider,
    public userProvider :UserProvider ,
     public formBuilder : FormBuilder,
     public navCtrl: NavController,
     public navParams: NavParams,
     public eventProvider :EventProvider) {

      this.currentUser = fire.auth.currentUser.uid; 
      this.getInvitations();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationsPage');
  }


getInvitations(){

  firebase.database().ref(`/invitations/${this.currentUser}`).orderByChild('date').on('value',snapshot=>{

    
    snapshot.forEach(snap=>{
     
        this.Invitations.push({
          senderPhotoURL :snap.val().senderPhotoURL,
          senderFirstName :snap.val().senderFirstName,
          senderLastName :snap.val().senderLastName,
          idEvent :snap.val().idEvent,
          date : new Date(-1*(snap.val().date)).toString().replace( "GMT+0200" , "" ).replace( "(heure d\’été d\’Europe centrale)" , "" ).replace( "Z" , "" ).replace("GM +0200 (heure d'été d'Europe centrale)",""),
          senderUid :snap.val().senderUid
        });

     });
  });
  
 
}




VisitProfile(uid){

  this.userProvider.setIdUser(uid);
  console.log('recu de la form ', uid);
  this.navCtrl.push('VisitprofilePage');

 }



 seeDetails(idEvent){

this.eventProvider.setIdEvent(idEvent);
this.navCtrl.push('EventsPage');

 }



}
