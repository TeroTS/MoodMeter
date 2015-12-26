(function() {

    'use strict';

	angular
		.module('moodMeter', [
			'ui.router',
			'ui.bootstrap',
			'chart.js',
			'ngCookies',
			'app.admins',
			'app.dashboard',
			'app.home',
			'app.login',
			'app.main',
			'app.managers',
		//	'app.modalWindow',
			'app.myAccount',
			'app.signup',
			'app.user',
			'app.users'
		])
        .config(config);

	function config($urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');
	}

})();