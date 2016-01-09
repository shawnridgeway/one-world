'use strict';

class loginRegisterController {
	constructor(Auth) {
		var self = this;
		this.user = {};
		this.errors = {};
		this.submitted = false;

		this.Auth = Auth;
	}

	login(form) {
		this.submitted = true;
		console.log('hello');
		if (form.$valid) {
	      this.Auth.login({
	        email: this.user.email,
	        password: this.user.password
	      })
	      .then(function() {
	      	console.log('hi');
	        // Logged in, redirect to home
	        //this.$state.go('main');
	      })
	      .catch(function(err) {
	      	console.log('oh no');
	        this.errors.other = err.message;
	      });
	    }
	}
}

angular.module('oneWorldApp')
  .controller('loginRegisterController', loginRegisterController);