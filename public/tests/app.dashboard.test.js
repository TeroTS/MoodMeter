describe('app.dashboard module', function () {

    var $controller,
        _getCounts;

    beforeEach(module('app.dashboard'));

    beforeEach(inject(function(_$controller_) {
        _getCounts = {data : {users: 2, managers: 5, admins: 8}};
        $controller = _$controller_('dashboardCtrl', {getCounts: _getCounts});
    }));

    it('should get count data', function () {
        expect($controller.numberOf.users).toBe(2);
        expect($controller.numberOf.managers).toBe(5);
        expect($controller.numberOf.admin).toBe(8);
    });

});