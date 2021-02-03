import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatTabsModule, MatChipsModule, MatIconModule, MatToolbarModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule } from "@angular/material";


@NgModule({
  declarations: [
     WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule

  ],
})
export class WelcomePageModule {}
