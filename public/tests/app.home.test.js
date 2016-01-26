describe('app.home module', function () {

    var $controller,
        $rootScope,
        $httpBackend,
        authRequestHandler,
        _ratingButtonService;

    beforeEach(module('moodMeter'));

    beforeEach(inject(function(_$controller_, _$httpBackend_, restFactory, ratingButtonService) {
        spyOn(ratingButtonService, 'setMouseover').and.callThrough();
        spyOn(ratingButtonService, 'unsetMouseover').and.callThrough();
        spyOn(ratingButtonService, 'setSelected').and.callThrough();
        $httpBackend = _$httpBackend_;
        authRequestHandler = $httpBackend.when('POST', '/users/1234/data')
                             .respond(200, '');
        $rootScope = {'user': {id: 1234}};
        _ratingButtonService = ratingButtonService;
        $controller = _$controller_('homeCtrl', {$rootScope: $rootScope, restFactory: restFactory, ratingButtonService: _ratingButtonService});
        $controller.ratingButtons = [{notActive: true, mouseover: false, selected: false, value: 1}, 
                                     {notActive: true, mouseover: false, selected: false, value: 2}];
    }));

    it('should set mouseover', function () {
        $controller.setMouseover(0);
        expect(_ratingButtonService.setMouseover).toHaveBeenCalledWith(0, $controller.ratingButtons);
        expect($controller.ratingButtons[0].notActive).toBe(false);
        expect($controller.ratingButtons[0].mouseover).toBe(true);
        expect($controller.ratingButtons[1].notActive).toBe(true);
        expect($controller.ratingButtons[1].mouseover).toBe(false);
    });

    it('should unset mouseover', function () {
        $controller.unsetMouseover(0);
        expect(_ratingButtonService.unsetMouseover).toHaveBeenCalledWith(0, $controller.ratingButtons);
        expect($controller.ratingButtons[0].notActive).toBe(true);
        expect($controller.ratingButtons[0].mouseover).toBe(false);
        expect($controller.ratingButtons[1].notActive).toBe(true);
        expect($controller.ratingButtons[1].mouseover).toBe(false);
    });

    it('should set selected', function () {
        $controller.setSelected(0);
        expect(_ratingButtonService.setSelected).toHaveBeenCalledWith(0, $controller.ratingButtons);
        expect($controller.ratingButtons[0].notActive).toBe(false);
        expect($controller.ratingButtons[0].mouseover).toBe(false);
        expect($controller.ratingButtons[0].selected).toBe(true);
        expect($controller.ratingButtons[1].notActive).toBe(true);
        expect($controller.ratingButtons[1].mouseover).toBe(false);
        expect($controller.ratingButtons[1].selected).toBe(false);
    });

    it('should close alert', function () {
        $controller.alerts = [{}];
        $controller.closeAlert (0);
        expect($controller.alerts.length).toBe(0);
    });

    it('should do POST when sending data', function () {
        $httpBackend.expectPOST('/users/1234/data');
        $controller.postData();
        $httpBackend.flush();
    });

    it('should open alert when data sent succesfully', function () {
        $controller.postData();
        $httpBackend.flush();
        expect($controller.alerts.length).toBe(1);
    });

});