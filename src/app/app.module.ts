import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { RouteReuseStrategy  } from '@angular/router';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AddPostPage } from '../pages/add-post/add-post';
import {SharedlocationsPage} from '../pages/sharedlocations/sharedlocations';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { UserProvider } from '../providers/user/user';
import { UsersProvider } from '../providers/users/users';
import { FollowProvider } from '../providers/follow/follow';
import { JoiningProvider } from '../providers/joining/joining';
import { SharesProvider } from '../providers/shares/shares';
import { CommentsProvider } from '../providers/comments/comments';
import { LikesProvider } from '../providers/likes/likes';
import { NotificationsPage } from '../pages/notifications/notifications';
import { SearchPage } from '../pages/search/search';
import { TopeventsPage } from '../pages/topevents/topevents';
import { Calendar } from '@ionic-native/calendar/ngx';
import { WelcomePage } from '../pages/welcome/welcome';
import { AcceuilPage } from '../pages/acceuil/acceuil';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {Geolocation } from '@ionic-native/geolocation';
import { LikesPage } from '../pages/likes/likes';
import { JoiningsPage } from '../pages/joinings/joinings';
import { LikesPageModule } from '../pages/likes/likes.module';
import { JoiningsPageModule } from '../pages/joinings/joinings.module';
import { SharedlocationsPageModule } from '../pages/sharedlocations/sharedlocations.module';
import { EditeventPage } from '../pages/editevent/editevent';
import { EditeventPageModule } from '../pages/editevent/editevent.module';
import { GoogleMaps} from '@ionic-native/google-maps';
import { SignoutPage } from '../pages/signout/signout';
import { SearchPageModule } from '../pages/search/search.module';
import { LocationProvider } from '../providers/location/location';
import { InvitationsPage } from '../pages/invitations/invitations';


const firebaseConfig = {
  apiKey: "AIzaSyC9bNiRRAJk-SrEX9RnTpUrE2Cb2iQUIkI",
  authDomain: "joinmeapp-290cc.firebaseapp.com",
  databaseURL: "https://joinmeapp-290cc.firebaseio.com",
  projectId: "joinmeapp-290cc",
  storageBucket: "joinmeapp-290cc.appspot.com",
  messagingSenderId: "928853325812",
  appId: "1:928853325812:web:56dc588c9ad32c4fd5aba1"
};

@NgModule({
  declarations: [
    MyApp,
   
    AboutPage,
    ContactPage,
     WelcomePage,
    HomePage,
    TabsPage,
    LoginPage,
    AddPostPage,
    NotificationsPage,
    SearchPage,
    TopeventsPage,
    SignoutPage,
    InvitationsPage
  
    
    
   
    
    

    
  
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    AngularFireStorageModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    LikesPageModule,
    JoiningsPageModule,
    SharedlocationsPageModule,
    EditeventPageModule,
   

    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AddPostPage,
    NotificationsPage,
    SearchPage,
    TopeventsPage,
    WelcomePage,
    LikesPage,
    JoiningsPage,
    SharedlocationsPage,
    EditeventPage,
    SignoutPage,
    InvitationsPage
    
    
    
  
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MatDatepickerModule,
    MatNativeDateModule ,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Calendar,
    AuthProvider,
    EventProvider,
    UserProvider,
    UsersProvider,
    FollowProvider,
    JoiningProvider,
    SharesProvider,
    CommentsProvider,
    LikesProvider,
     Geolocation,
     GoogleMaps,
    LocationProvider

     
  ]
})
export class AppModule {}
