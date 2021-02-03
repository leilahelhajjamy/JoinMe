import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileCompletePage } from './profile-complete';

@NgModule({
  declarations: [
    ProfileCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileCompletePage),
  ],
})
export class ProfileCompletePageModule {}
