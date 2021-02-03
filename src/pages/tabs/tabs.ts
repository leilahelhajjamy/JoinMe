import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { AcceuilPage } from '../acceuil/acceuil';
import { AddPostPage } from '../add-post/add-post';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { InvitationsPage } from '../invitations/invitations';
import { LoginPage } from '../login/login';
import { NotificationsPage } from '../notifications/notifications';

import { SignoutPage } from '../signout/signout';

import { WelcomePage } from '../welcome/welcome';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WelcomePage;
  tab2Root = ContactPage;
  tab3Root =  AddPostPage;
  tab4Root = InvitationsPage;
  tab5Root = SignoutPage


  constructor() {

  }
}
