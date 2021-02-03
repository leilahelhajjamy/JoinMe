import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formregister : FormGroup;
  userlogged
  email : string ;
  password : string ;
  constructor( public fire: AngularFireAuth,private alertCtrl: AlertController, 
    public formBuilder : FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl : LoadingController,) {
      this.formregister = this.formBuilder.group({
        password : new FormControl('', Validators.compose([
            Validators.required
        ])),
                email : new FormControl('', Validators.compose([
             Validators.required
        ]))
  });


  


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  LoginUser(){
   this.fire.auth.signInWithEmailAndPassword(this.email, this.password).then(user=>{
    console.log(user,'logged in');
    this.navCtrl.push('AcceuilPage');

   }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  }

GoRegister(){

  this.navCtrl.push('RegisterPage');
}
 

}
