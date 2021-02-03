import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedlocationsPage } from './sharedlocations';

@NgModule({
  declarations: [
    SharedlocationsPage,
  ],
  imports: [
    IonicPageModule.forChild(SharedlocationsPage),
  ],
})
export class SharedlocationsPageModule {}
