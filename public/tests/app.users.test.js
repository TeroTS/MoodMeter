describe('app.users module', function () {

    var $controller,
        _utilsService,
        _getAdmins;

    beforeEach(module('moodMeter'));

    beforeEach(inject(function(_$controller_, utilsService) {
        spyOn(utilsService, 'openModal');
        _utilsService = utilsService;
        _getUsers = {data : [{name: 'Jussi User'}]};
        $controller = _$controller_('usersCtrl', {$state: {}, dataService: {}, utilsService: _utilsService, restFactory: {}, getUsers: _getUsers});
    }));

    it('should get user data', function () {
        expect($controller.users[0].name).toBe('Jussi User');
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