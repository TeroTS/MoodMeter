describe('app.managers module', function () {

    var $controller,
        _utilsService,
        _getAdmins;

    beforeEach(module('moodMeter'));

    beforeEach(inject(function(_$controller_, dataService, utilsService, restFactory, getManagers) {
        spyOn(utilsService, 'openModal');
        spyOn(dataService, 'writeUserData').and.callThrough();
        _utilsService = utilsService;
        _getManagers = {data : [{id: 1234}]};
        $controller = _$controller_('managersCtrl', {restFactory: {}, utilsService: _utilsService, getManagers: _getManagers});
    }));

    it('should persist user', function () {
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