'use strict';


app.service('ResultsService', ['esFactory', function (esFactory) {
  return esFactory({
    host: ':9200',
    apiVersion: '1.4',
    log: 'trace'
  });
}]);
