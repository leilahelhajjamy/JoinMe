import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopeventsPage } from './topevents';

@NgModule({
  declarations: [
    TopeventsPage,
  ],
  imports: [
    IonicPageModule.forChild(TopeventsPage),
  ],
})
export class TopeventsPageModule {}
