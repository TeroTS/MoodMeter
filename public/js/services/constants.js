(function() {

    'use strict';

    angular
        .module('moodMeter')
        .constant('constants', constants);

    var constants = {
    	'TIME_OPTIONS': ['1 week', '1 month', '3 months'],
    	'DEFAULT_TIME_OPTION': '1 week'
    };

})();



