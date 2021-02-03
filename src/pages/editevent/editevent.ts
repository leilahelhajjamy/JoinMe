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
import { LikesProvider } from '../../providers/likes/likes';

/**
 * Generated class for the EditeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editevent',
  templateUrl: 'editevent.html',
})
export class EditeventPage {

  image = 'https://i0.wp.com/brainstomping.com/wp-content/uploads/2010/10/theevent.png?ssl=1';
  imagePath='';
  upload: any;

  formPost : FormGroup;
  photo : string ;
  localisation: string ;

idPost
PostData = {
  author :'',
  idEvent :'',
  datedebut:'',
  time:'',
  firstName:'',
  lastName:'',
  photoEvent:'',
  photoURL:'',
  text:'',
  localisation:'',
  createdAt :'',
  oldphoto :''
}
  constructor(public userProvider :UserProvider, public camera: Camera,public loadingController: LoadingController,
    public alertController: AlertController,
    public afSG: AngularFireStorage, public usersProvider : UsersProvider,public user :UserProvider,public authProvider : AuthProvider,fDB: AngularFireDatabase, public fire: AngularFireAuth, 
    public formBuilder : FormBuilder, 
    private loadingCtrl : LoadingController ,public likesProvider :LikesProvider ,public navCtrl: NavController, public navParams: NavParams) 
    {
 
    this.idPost = this.likesProvider.getPostId();
    this.getPostData(this.idPost);
  
    this.formPost = this.formBuilder.group({
      Post : new FormControl('', Validators.compose([
          Validators.required
      ])),
             localisation : new FormControl('', Validators.compose([
           Validators.required
      ])) ,
      photo : new FormControl('', Validators.compose([
        Validators.required
   ])) ,  
    datedebut : new FormControl('', Validators.compose([
    Validators.required
])) ,
time : new FormControl('', Validators.compose([
Validators.required
])),

city : new FormControl('', Validators.compose([
Validators.required
])),
firstName : new FormControl('', Validators.compose([
  Validators.required
  ])),
  lastName : new FormControl('', Validators.compose([
    Validators.required
    ])),
    author : new FormControl('', Validators.compose([
      Validators.required
      ])),
      photoURL : new FormControl('', Validators.compose([
        Validators.required
        ])),
        idEvent : new FormControl('', Validators.compose([
          Validators.required
          ])),
          createdAt : new FormControl('', Validators.compose([
            Validators.required
            ])),
});




 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditeventPage');
  }




  getPostData(idPost){

    firebase.database().ref(`/posts/`).orderByChild('idEvent').equalTo(idPost).on('value', snapshot =>{

      snapshot.forEach( snap =>{
                
      firebase.storage().ref(snap.val().photoEvent).getDownloadURL().then(imgUrl => {
     
       firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgUserUrl=>{
     
        
        
        this.PostData.author=snap.val().author;
        this.PostData.firstName =snap.val().firstName;
        this.PostData.lastName =snap.val().lastName;
        this.PostData.createdAt= snap.val().createdAt;
        this.PostData.localisation= snap.val().localisation;
        this.PostData.photoURL= snap.val().photoURL;
        this.PostData.text= snap.val().text;
        this.PostData.photoEvent = imgUrl;
        this.PostData.oldphoto =snap.val().photoEvent
        this.image =imgUrl;
        this.PostData.datedebut =snap.val().datedebut;
        this.PostData.time =snap.val().time;
        this.PostData.idEvent =snap.val().idEvent;
            
         
       });
       
         
       }).catch(function(error) {
     
         switch (error.code) {
           case 'storage/object-not-found':
             console.log('File doesnt exist') ;
             break;
       
           case 'storage/unauthorized':
             console.log("User doesnt have permission to access the object");
             break;
       
           case 'storage/canceled':
             console.log('User canceled the upload');
             break;
       
         
           case 'storage/unknown':
            console.log('Unknown error occurred, inspect the server response');
             break;
         }
       });
     });
     });


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

  }



  AddPost(Post,datedebut,time,localisation,city)
  {

    firebase.database().ref(`/posts/${this.PostData.idEvent}`).set({

      idEvent:this.PostData.idEvent,
      text : Post,
      localisation :localisation,
      createdAt :this.PostData.createdAt,
      photoEvent: this.PostData.oldphoto ,
      author : this.PostData.author ,
       firstName : this.PostData.firstName,
       lastName : this.PostData.lastName ,
       photoURL :this.PostData.photoURL ,
       datedebut :datedebut,
       time : time  
     });

     this.userProvider.setIdUser(this.PostData.author);
    console.log('recu de la form ', this.PostData.author);
    this.navCtrl.push('VisitprofilePage');

     
    
  }






}
