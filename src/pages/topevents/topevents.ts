import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
/**
 * Generated class for the TopeventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topevents',
  templateUrl: 'topevents.html',
})
export class TopeventsPage {
  TopEvents= [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
    firebase.database().ref(`/posts/`).orderByChild('totalLikes').limitToLast(2).on('value', snapshot =>{
      this.TopEvents= [];
      
        snapshot.forEach( snap =>{
       
          this.TopEvents.push({ 
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
    console.log('ionViewDidLoad TopeventsPage');
  }

}
