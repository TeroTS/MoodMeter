describe('app.main module', function () {

    var $controller,
        $httpBackend,
        authRequestHandler;

    beforeEach(module('moodMeter'));

    beforeEach(inject(function(_$controller_, _$httpBackend_, restFactory) {
        $httpBackend = _$httpBackend_;
        authRequestHandler = $httpBackend.when('POST', '/logout')
                             .respond(200, '');
        $controller = _$controller_('mainCtrl', {restFactory: restFactory});
    }));

    it('should do POST when logging out', function () {
        $httpBackend.expectPOST('/logout');
        $controller.logout();
        $httpBackend.flush();
    });

});