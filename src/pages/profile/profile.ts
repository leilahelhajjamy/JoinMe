import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import{AuthProvider} from '../../providers/auth/auth';
import { FormGroup, FormBuilder , Validators,FormControl} from '@angular/forms';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  formupdate : FormGroup;
  username : string ;
 // phoneNumber : number ;
  photoURL : string ;
  userConnected
  userId
  people
  users
  constructor(public authProvider : AuthProvider, 
    public formBuilder : FormBuilder, public navCtrl: NavController, public navParams: NavParams,afDB: AngularFireDatabase) {
    // this.people = afDB.list('/people').valueChanges();
    this.userConnected =authProvider.getEmail();
    this.userId =authProvider.getId();
    console.log(authProvider.getEmail(),'user got from provider');
    
      this.users = afDB.list('/users');



    this.formupdate = this.formBuilder.group({
      // phoneNumber: new FormControl('', Validators.compose([
      //     Validators.required
      // ])),
      username : new FormControl('', Validators.compose([
        Validators.required
    ])),        
      photoURL : new FormControl('', Validators.compose([
           Validators.required
      ]))
});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  UpdateUser(username,photoURL){
    console.log('clicked',username,photoURL);

  }

}
