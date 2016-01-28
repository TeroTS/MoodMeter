describe('app.signup module', function () {

    var $httpBackend,
        $controller,
        $location,
        authRequestHandler;

    beforeEach(module('app.signup'));

    beforeEach(inject(function(_$controller_, _$httpBackend_, _$location_) {
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        authRequestHandler = $httpBackend.when('POST', '/signup')
                             .respond(200, '');
        $controller = _$controller_('signupCtrl', {});
        $controller.user = {};
    }));

    it('should do POST when signup', function () {
        $httpBackend.expectPOST('/signup');
        $controller.signup();
        $httpBackend.flush();
    });

    it('should signup ok', function () {
        $controller.signup();
        $httpBackend.flush();
        expect($location.path()).toBe('/login');
    });

    it('should fail signup', function () {
        authRequestHandler.respond(401, '');
        $controller.signup();
        $httpBackend.flush();
        expect($location.path()).toBe('/signup');
    });

});