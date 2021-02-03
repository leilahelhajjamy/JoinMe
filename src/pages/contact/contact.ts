import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, LoadingController, NavController, NavParams ,AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';
import {Platform} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import { AngularFireStorage } from '@angular/fire/storage';
import { ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,
  GoogleMapOptions, Environment 
 } from '@ionic-native/google-maps'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage  {
  map: GoogleMap; 
formlatlng : FormGroup;
lat =null
lng =null
adresse 
places
latlng :string;
found :boolean = false;
currentUser
firstName
lastName
photoURL
now = -1 * new Date().getTime();

  constructor(private googleMaps: GoogleMaps, public alertController: AlertController,public loadingController: LoadingController,private httpClient: HttpClient, public platform :Platform ,public geolocation :Geolocation, public modalCtrl: ModalController,public modalController: ModalController,public authProvider :AuthProvider,public userProvider :UserProvider,public fire: AngularFireAuth,public formBuilder : FormBuilder,public navCtrl: NavController,
    public navParams: NavParams, ){

    this.currentUser = fire.auth.currentUser.uid; 

    firebase.database().ref(`/users/${this.currentUser }`).on('value', snapshot =>{
      this.firstName= '';
      this.lastName = '';
      this.photoURL='';
        snapshot.forEach( snap =>{
                
           this.firstName = snap.val().firstName,
            this.lastName = snap.val().lastName,
            this.photoURL =snap.val().photoURL
           
          
        });
      });

      this.formlatlng = this.formBuilder.group({
        lat : new FormControl('', Validators.compose([
            Validators.required
        ])),
               lng : new FormControl('', Validators.compose([
             Validators.required
        ])),
        adresse : new FormControl('', Validators.compose([
          Validators.required
     ])),
     description: new FormControl('', Validators.compose([
      Validators.required
 ]))
  });


    }  
 
 

getAdresse(lat:string,lng :string){

  this.httpClient.get("https://maps.googleapis.com/maps/api/geocode/json",{params:{

    latlng :lat+','+lng
    ,key :'key here'
    }}).subscribe(data=>{
  
        console.log(data);
        this.adresse= data['results'][0].formatted_address;
        console.log(this.adresse);
        console.log(data['results'][1].geometry['location']['lat']);
        console.log(data['results'][1].geometry['location']['lng']);
    });
  

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: lat,
           lng: lng
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.lat,
        lng: this.lng
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });

}


async getadresse(){
  const loading = await this.loadingController.create();
  await loading.present();

  this.geolocation.getCurrentPosition({timeout :10000,enableHighAccuracy :true}).then((res)=>{
    this.lat =res.coords.latitude;
   
    this.lng =res.coords.longitude;


  }).catch((err)=>{
    console.log(err);
  });

  await loading.dismiss();
  const alert = await this.alertController.create({
    title: 'Félicitation',
    message: 'Location found!',
    buttons: [{
      text: 'OK',
    }]
    });
    await alert.present();
    this.found = true;

}



Share(adresse,description){

  var loctionData = {
    idLocation :'',
    date : this.now,
    adresse: adresse,
    author : this.currentUser,
     firstName : this.firstName,
     lastName : this.lastName ,
     photoURL :this.photoURL ,
     description :description,
    lat :this.lat,
    lng :this.lng
       
     
   };

   var newPostKey = firebase.database().ref().child('sharedlocations').push().key;

   loctionData.idLocation = newPostKey;
    var updates={};

    updates['/sharedlocations/' + newPostKey] = loctionData;
    firebase.database().ref().update(updates);

    this.navCtrl.push('AcceuilPage');
  
}



}
