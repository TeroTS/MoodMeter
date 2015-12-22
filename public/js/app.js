(function() {

    'use strict';

	angular
		.module('moodMeter', [
			'ui.router', 
			'ui.bootstrap', 
			'chart.js', 
			'ngCookies'
		])
        .config(config);

	function config($urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');
	}

})();