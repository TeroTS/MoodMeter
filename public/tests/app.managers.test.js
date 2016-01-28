describe('app.managers module', function () {

    var $controller,
        _utilsService,
        _dataService,
        _getAdmins;

    beforeEach(module('moodMeter'));

    beforeEach(inject(function(_$controller_, dataService, utilsService) {
        spyOn(utilsService, 'openModal');
        _utilsService = utilsService;
        _dataService = dataService;
        _getManagers = {data : [{name: 'Matti Manager', id: 1234}]};
        $controller = _$controller_('managersCtrl', {$state: {}, restFactory: {}, dataService: dataService, utilsService: _utilsService, getManagers: _getManagers});
    }));

    it('should persist user', function () {
        $controller.saveUser(0);
        var user = _dataService.readUserData('data');
        expect(user.name).toBe('Matti Manager');
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