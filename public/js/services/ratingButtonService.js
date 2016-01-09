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

        this.unsetMouseover = function(idx, ratingButtonArray) {
            for (var i=0; i<ratingButtonArray.length; i++) {
                ratingButtonArray[i].mouseover = false;
                if (i === idx) {
                    if (ratingButtonArray[i].selected === true) {
                        ratingButtonArray[i].notActive = false;
                    } else {
                        ratingButtonArray[i].notActive = true;
                    }

                } else {
                    ratingButtonArray[i].notActive = true;
                }
            }
        };

        this.setSelected = function(idx, ratingButtonArray) {
            for (var i=0; i<ratingButtonArray.length; i++) {
                if (i === idx) {
                    ratingButtonArray[i].notActive = false;
                    ratingButtonArray[i].mouseover = false;
                    ratingButtonArray[i].selected = true;
                } else {
                    ratingButtonArray[i].notActive = true;
                    ratingButtonArray[i].mouseover = false;
                    ratingButtonArray[i].selected = false;
                }
            }
        };



    }

})();