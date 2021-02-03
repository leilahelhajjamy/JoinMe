import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeMapPage } from './see-map';

@NgModule({
  declarations: [
    SeeMapPage,
  ],
  imports: [
    IonicPageModule.forChild(SeeMapPage),
  ],
})
export class SeeMapPageModule {}
