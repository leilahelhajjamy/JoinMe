import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { UserProvider } from '../../providers/user/user';
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
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationProvider } from '../../providers/location/location';
/**
 * Generated class for the SharedlocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sharedlocations',
  templateUrl: 'sharedlocations.html',
})
export class SharedlocationsPage {
  map: GoogleMap; 
  formlatlng : FormGroup;
idLocation
LocationData={

author :'',
date :'',
adresse :'',
description :'',
photoURL:'',
firstName :'',
lastName :'',
lat : null,
lng : null

};

seenClicked = false
  formBuilder: any;
  constructor( public locationProvider :LocationProvider ,private httpClient: HttpClient,private googleMaps: GoogleMaps,public viewCtrl: ViewController, public userProvider :UserProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.idLocation = locationProvider.getIdLocation();
    this.seeLocation(this.idLocation);
    
  
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharedlocationsPage');
  }


seeLocation(idLocation){

  firebase.database().ref(`/sharedlocations/`).orderByChild('idLocation').equalTo(idLocation).on('value',snapshot=>{
    snapshot.forEach(snap=>{

      firebase.storage().ref(snap.val().photoURL).getDownloadURL().then(imgUserUrl=>{
    
  
      this.LocationData.adresse = snap.val().adresse;
      this.LocationData.author = snap.val().author;
      this.LocationData.firstName = snap.val().firstName;
      this.LocationData.lastName = snap.val().lastName;
      this.LocationData.photoURL = imgUserUrl;
      this.LocationData.adresse = snap.val().adresse;
      this.LocationData.date = new Date( -1*(snap.val().date)).getHours()+':'+new Date(-1*(snap.val().date)).getMinutes();
      this.LocationData.description = snap.val().description; 
      this.LocationData.lat =snap.val().lat;
      this.LocationData.lng =snap.val().lng;

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



VisitProfile(uid){

  this.userProvider.setIdUser(uid);
    console.log('recu de la form ', uid);
    this.navCtrl.push('VisitprofilePage');

}


back() {

  this.navCtrl.push('AcceuilPage')
}



  seeMap(lat:string,lng :string){

   this.seenClicked =true; 
  this.httpClient.get("https://maps.googleapis.com/maps/api/geocode/json",{params:{

    latlng :lat+','+lng
    ,key :'key here'
    }}).subscribe(data=>{
  
        console.log(data);
        this.LocationData.adresse= data['results'][0].formatted_address;
        console.log(this.LocationData.adresse);
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
      title: 'Here',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.LocationData.lat,
        lng: this.LocationData.lng
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
   
    });

  

}


}
