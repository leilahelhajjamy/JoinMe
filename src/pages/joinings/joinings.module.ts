import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoiningsPage } from './joinings';

@NgModule({
  declarations: [
    JoiningsPage,
  ],
  imports: [
    IonicPageModule.forChild(JoiningsPage),
  ],
})
export class JoiningsPageModule {}
