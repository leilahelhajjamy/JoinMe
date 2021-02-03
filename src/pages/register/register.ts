import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import{AuthProvider} from '../../providers/auth/auth';
import { ProfileCompletePage } from '../profile-complete/profile-complete';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  formregister : FormGroup;
 
  email : string ;
  password : string ;
  firstName :string;
  lastName :string;
  city :string ;
  userRegistered 
  userId
 users
  constructor(public user :UserProvider,public authProvider : AuthProvider,fDB: AngularFireDatabase, public fire: AngularFireAuth,private alertCtrl: AlertController, 
    public formBuilder : FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl : LoadingController,
  
    ) {
      // this.users = fDB.list('/users')
    this.formregister = this.formBuilder.group({
      password : new FormControl('', Validators.compose([
          Validators.required
      ])),
              email : new FormControl('', Validators.compose([
           Validators.required
      ])),
     firstName : new FormControl('', Validators.compose([
        Validators.required
      ])),
     lastName : new FormControl('', Validators.compose([
        Validators.required
        ]))
            
});
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  RegisterUser(){
    

 this.fire.auth.createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode,errorMessage);
      
      // ...
    });
    this.user.setName(this.firstName,this.lastName);
   
    this.navCtrl.push('ProfileCompletePage');
 
 
    
  }

    
 
}




