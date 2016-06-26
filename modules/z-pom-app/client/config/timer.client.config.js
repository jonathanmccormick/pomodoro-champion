(function () {
  'use strict';

  angular
    .module('z-pom-app')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Timer',
      state: 'timer',
      roles: ['user']
    });
    Menus.addMenuItem('topbar', {
      title: 'Preferences',
      state: 'preferences',
      roles: ['user']
    });
    Menus.addMenuItem('topbar', {
      title: 'Reports',
      state: 'reports',
      roles: ['user']
    });
  }
})();
