describe('app.user module', function () {

    var $controller,
        _$controller,
        $httpBackend,
        authRequestHandler,
        _dataService,
        _getManagers;

    beforeEach(module('moodMeter'));

    beforeEach(inject(function(_$controller_, _$httpBackend_, dataService, restFactory) {
        $httpBackend = _$httpBackend_;
        authRequestHandler = $httpBackend.when('PUT', '/users/1234')
                             .respond(200, {name: 'Jussi User', id: 1234});
        _$controller = _$controller_;
        _dataService = dataService;
        _getManagers = {data: [{name: 'Matti Manager', id: 1234}]};
        $controller = _$controller_('userCtrl', {dataService: _dataService, restFactory: restFactory, getManagers: _getManagers});
        dataService.writeUserData('data', {role: 'user', managerName: 'Matti Manager'});
    }));

    it('should initialize controller', function () {
        $controller = _$controller('userCtrl', {dataService: _dataService, restFactory: {}, getManagers: _getManagers});
        expect($controller.isUserManager).toBe(false);
        expect($controller.myManager.name).toBe('Matti Manager');
    });

    it('should update user succesfully', function () {
        $controller.user.id = '1234';
        $httpBackend.expectPUT('/users/1234');
        $controller.updateUser();
        $httpBackend.flush();
        expect($controller.user.name).toBe('Jussi User');
        expect($controller.user.id).toBe(1234);
    });

    it('should close alert', function () {
        $controller.alerts = [{}];
        $controller.closeAlert (0);
        expect($controller.alerts.length).toBe(0);
    });

});