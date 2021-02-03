import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  map: GoogleMap;
  
  constructor(private googleMaps: GoogleMaps,public navCtrl: NavController, public navParams: NavParams) {
  

 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.loadMap();
  }

  ngAfterViewInit() {
    
   }

   loadMap() {

  
  // Environment.setEnv({
  //    'API_KEY_FOR_BROWSER_RELEASE': '(your api key for `AIzaSyD15u4rzon4TQKdEBZ5PJxKM805-lZ0nuY`)',
  //     'API_KEY_FOR_BROWSER_DEBUG': '(your api key for `AIzaSyD15u4rzon4TQKdEBZ5PJxKM805-lZ0nuY`)'
  //    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  } 


}
