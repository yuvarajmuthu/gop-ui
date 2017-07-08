/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
var routerVer = '@2.0.0-rc.1';
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular/router':            'node_modules/@angular/router',

    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'moment': 'node_modules/moment',
    'ng2-bootstrap':   'node_modules/ng2-bootstrap',
    'ngx-bootstrap':   'node_modules/ngx-bootstrap', 
    'angular2-google-maps' : 'node_modules/angular2-google-maps',
    'd3': 'node_modules/d3',

    //'register': 'node_modules/register',
    //'userManagement':   'node_modules/userManagement',
    //'identitymgmt':'node_modules/identitymgmt',
    //'congress-maps-us': 'node_modules/congress-maps-us',

  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'ng2-bootstrap': { format: 'cjs', main: 'bundles/ng2-bootstrap.umd.js', defaultExtension: 'js' },
    'ngx-bootstrap': { format: 'cjs', main: 'bundles/ngx-bootstrap.umd.js', defaultExtension: 'js' },    
    'moment':                     { main: 'moment.js', defaultExtension: 'js' },
    'node_modules/angular2-google-maps/core': { main: 'index.js', defaultExtension: 'js' },
    'd3' : {main:'d3.js', defaultExtension: 'js'},
    '@angular/router' : {main:'index.js', defaultExtension: 'js'},
    //'register' : {main:'app.43a45297bc7249e35ee9.js', defaultExtension: 'js'},
    //'node_modules/identitymgmt': { main: 'app.43a45297bc7249e35ee9.js',  defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  };

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  }

  System.config(config);

})(this);