(function() {

    'use strict';

	angular
		.module('moodMeter', [
			'ui.router',
			'ui.bootstrap',
			'chart.js',
			'ngCookies',
			'app.admins',
			'app.dashboard'
		])
        .config(config);

	function config($urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');
	}

})();