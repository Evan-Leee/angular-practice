'use strict';

exports.setRoutes = function (app){
  app.use('/', require('./routers/index'));
  app.use('/board', require('./routers/board'));
};