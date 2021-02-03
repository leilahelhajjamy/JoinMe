import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { UsersProvider } from '../../providers/users/users';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

/**
 * Generated class for the AddPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {
  image 
  imagePath='Images/Posts/evenement.png';
  upload: any;
  uploaded =false;
  formPost : FormGroup;
  photo : string ;
  localisation: string ;
  
  User
  now = -1 * new Date().getTime();
 posts
 firstName 
  lastName
  photoURL
  name;
  email; 
  uid; 
  constructor(public camera: Camera,public loadingController: LoadingController,
    public alertController: AlertController,
    public afSG: AngularFireStorage, public usersProvider : UsersProvider,public user :UserProvider,public authProvider : AuthProvider,fDB: AngularFireDatabase, public fire: AngularFireAuth, 
    public formBuilder : FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private loadingCtrl : LoadingController) {


      var currentuser = fire.auth.currentUser; 
      if (currentuser != null) {
       
        this.email = currentuser.email;
        this.uid = currentuser.uid;  
        console.log(currentuser);
        firebase.database().ref(`/users/${this.uid}`).on('value', snapshot =>{
          this.firstName= '';
          this.lastName = '';
          this.photoURL='';
            snapshot.forEach( snap =>{
                    
               this.firstName = snap.val().firstName,
                this.lastName = snap.val().lastName,
                this.photoURL =snap.val().photoURL
               
              
            });
          });
          
      }
  
     
      this.formPost = this.formBuilder.group({
        Post : new FormControl('', Validators.compose([
            Validators.required
        ])),
               localisation : new FormControl('', Validators.compose([
             Validators.required
        ])) ,
        photo : new FormControl('', Validators.compose([
          Validators.required
     ])) ,   datedebut : new FormControl('', Validators.compose([
      Validators.required
 ])) ,
  time : new FormControl('', Validators.compose([
  Validators.required
])) ,
city : new FormControl('', Validators.compose([
Validators.required
]))

  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostPage');
  }

  async addPhoto(source: string) {
    if (source === 'library') {
      console.log('library');
      const libraryImage = await this.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
    } else {
      console.log('camera');
      const cameraImage = await this.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraImage;
    }
  }

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async uploadFirebase() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.imagePath = 'Images/Posts/'+ new Date().getTime() + '.jpg';

    this.upload = this.afSG.ref(this.imagePath).putString(this.image, 'data_url');
    this.upload.then(async () => {
      // this.image = 'https://i0.wp.com/brainstomping.com/wp-content/uploads/2010/10/theevent.png?ssl=1';
 
      await loading.dismiss();
       const alert = await this.alertController.create({
        title: 'Félicitation',
         message: 'Picture uploaded!',
         buttons: ['OK']
       });
       await alert.present();
    });
    this.uploaded =true;

  }


  AddPost(text,datedebut,time,localisation,city){

    

    var postData = {
      idEvent:'',
      text : text,
      localisation :localisation,
      createdAt :this.now,
      photoEvent: this.imagePath ,
      author : this.uid ,
       firstName : this.firstName,
       lastName : this.lastName ,
       photoURL :this.photoURL ,
       totalLikes :0,
       joinings :0,
       shares :0,
       comments :0 ,
       datedebut :datedebut,
       time : time ,
       city :city,
      
  
     };

     var newPostKey = firebase.database().ref().child('posts').push().key;

      postData.idEvent = newPostKey;
      var updates={};

      updates['/posts/' + newPostKey] = postData;
      firebase.database().ref().update(updates);
      this.navCtrl.push('AcceuilPage');
    
  }

}

  