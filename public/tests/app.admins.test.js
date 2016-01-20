describe('app.admins module', function () {

    var $controller,
        _utilsService,
        _getAdmins;

    beforeEach(module('moodMeter'));

    beforeEach(inject(function(_$controller_, _$httpBackend_, _$location_, utilsService) {
        spyOn(utilsService, 'openModal');
        _utilsService = utilsService;
        _getAdmins = {data : [{email: 'anna.admin@mail.com'}]};
        $controller = _$controller_('adminsCtrl', {restFactory: {}, utilsService: _utilsService, getAdmins: _getAdmins});
    }));

    it('should get admin data', function () {
        expect($controller.users[0].email).toBe('anna.admin@mail.com');
    });

    it('should call service open modal function', function () {
        $controller.open();
        expect(_utilsService.openModal).toHaveBeenCalled();
    });

    it('should close alert', function () {
        $controller.alerts = [{}];
        $controller.closeAlert (0);
        expect($controller.alerts.length).toBe(0);
    });

});