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

import { Storage } from '@ionic/storage';
import { AcceuilPage } from '../acceuil/acceuil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   
  userlogged
  currentUser
  constructor( private storage: Storage,public modalController: ModalController,public authProvider :AuthProvider,public userProvider :UserProvider,public nav :Nav,public fire: AngularFireAuth,public formBuilder : FormBuilder,public navCtrl: NavController,afDB: AngularFireDatabase,  
    public navParams: NavParams) {
      this.userlogged= fire.auth.onAuthStateChanged(function(user) {
        if (user) {
          
          console.log(user.uid,'user logged in');
       
        } else {
          console.log('You should log in');
          navCtrl.setRoot(LoginPage);
          
        }
      });
    

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    
  }

  Acceuil(){
 
    this.navCtrl.push('AcceuilPage');
  }

}