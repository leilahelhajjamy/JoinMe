import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import{AuthProvider} from '../../providers/auth/auth';
import { FormGroup, FormBuilder , Validators,FormControl} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

/**
/**
 * Generated class for the ProfileCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-complete',
  templateUrl: 'profile-complete.html',
})
export class ProfileCompletePage {
 
  username : string ;

  photoURL : string ;
  userConnected
  userId
  userEmail
  userFirstName
  userLastName
  userCity
  people
  users
  currentUser
  constructor(private storage: Storage,public User :UserProvider,public fire: AngularFireAuth,public authProvider : AuthProvider, 
    public formBuilder : FormBuilder, public navCtrl: NavController, public navParams: NavParams,afDB: AngularFireDatabase) {
    // this.people = afDB.list('/people').valueChanges();
    this.userConnected=fire.auth.onAuthStateChanged(function(user) {
      if (user) {
        storage.set('firstName', User.getFirstName());
        storage.set('lastName', User.getLastName());
        storage.set('city',User.getCity());
     this.userEmail = user.email;
      this.userId = user.uid;
      console.log(this.userEmail,'user logged in');
      this.users = afDB.list('/users/' + this.userId);
      this.userFirstName = User.getFirstName();
      this.userLastName = User.getLastName();
      // this.userCity = User.getCity;
      this.users.push({
     uid : this.userId,
     email :this.userEmail,
     firstName :this.userFirstName,
     lastName :this.userLastName,
     birthDay :'',
     phoneNumber :'',
     about :'',
    // city :this.userCity,
     adresse:'',
     photoURL :'Images/Users/person.png'
  
     });

      } else {
        console.log('no one logged in');
       
      }
    });
      
    navCtrl.push('AcceuilPage');

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


 

}
