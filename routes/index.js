/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Rutler Interface' })
};

exports.debug = function(req, res){
  res.render('debug', { title: 'Debug Rutler' })
};

exports.control = function(req, res){
  res.render('control', { title: 'Control Rutler' })
};
