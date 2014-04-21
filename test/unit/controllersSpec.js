'use strict';

describe('LyTel controllers', function () {
  describe('LyListCtrl', function () {
    var scope, ctrl;

    beforeEach(module('lyTelApp'));

    beforeEach(inject(function ($controller) {
      scope = {};
      ctrl = $controller('LyListCtrl', {$scope: scope});
    }));

    it('should create "lyList" model with 1 legislator', function () {
      expect(scope.lyList.length).toBe(1);
    });
  });
});
