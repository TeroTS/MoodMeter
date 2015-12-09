describe('ĺoginCtrl', function () {

    var $httpBackend,
        $controller,
        $location,
        authRequestHandler;
        //controller;

    beforeEach(module('moodMeter'));

    beforeEach(inject(function(_$controller_, _$httpBackend_, _$location_) {
        $location = _$location_;
        // $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        authRequestHandler = $httpBackend.when('POST', '/login')
                             .respond(200, '');
        $controller = _$controller_('loginCtrl', {});
        $controller.user = {};
    }));

    it('should do POST when login', function () {
        $httpBackend.expectPOST('/login');
        $controller.login();
        $httpBackend.flush();
    });

    it('should login ok', function () {
        $controller.login();
        $httpBackend.flush();
        expect($location.path()).toBe('/dashboard');
    });

    it('should fail login', function () {
        authRequestHandler.respond(401, '');
        $controller.login();
        $httpBackend.flush();
        expect($location.path()).toBe('/login');
    });

});