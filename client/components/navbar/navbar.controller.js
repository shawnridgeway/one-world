'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Forum',
    'state': 'main.forum'
  }, {
    'title': 'Chat',
    'state': 'main.chat'
  }];

  authDropdown = false;
  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('oneWorldApp')
  .controller('NavbarController', NavbarController);
