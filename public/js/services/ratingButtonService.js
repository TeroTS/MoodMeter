(function() {

    'use strict';

    angular
        .module('moodMeter')
        .service('ratingButtonService', ratingButtonService);

    function ratingButtonService() {

        /*jshint validthis: true */
        this.setMouseover = function(idx, ratingButtonArray) {
            for (var i=0; i<ratingButtonArray.length; i++) {
                if (i === idx) {
                    ratingButtonArray[i].notActive = false;
                    ratingButtonArray[i].mouseover = true;
                } else {
                    ratingButtonArray[i].notActive = true;
                    ratingButtonArray[i].mouseover = false;
                }
            }
        };



    }

})();