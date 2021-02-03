import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase/app';
/**
 * Generated class for the SignoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signout',
  templateUrl: 'signout.html',
})
export class SignoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignoutPage');
  }



  SignOut(){

    firebase.auth().signOut().then(function(){
     console.log('USER LOGGED OUT');
     this.navCtrl.push('AcceuilPage');
    }).catch(function(error) {
      // An error happened.
    });

  }
}
