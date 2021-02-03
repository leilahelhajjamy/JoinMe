import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
adresse
lng
lat
idLocation
  constructor(public http: HttpClient) {
    console.log('Hello LocationProvider Provider');
  }

setAdresse(adresse){
this.adresse =adresse

}

setLat(lat){
  this.lat =lat;
}

setLng(lng){
  this.lng =lng;
}


getAdresse(){
return this.adresse;

}
getLat(){
return this.lat;

}
getLng(){
  return this.lng;
}

setIdLocation(idLocation){
this.idLocation =idLocation;

}

getIdLocation(){

return this.idLocation;
}


}
