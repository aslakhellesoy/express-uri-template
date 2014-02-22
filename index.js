module.exports = function(pattern, params) {
  var result = pattern;

  // First, replace non-glob params (:xxx params)
  for(var param in params) {
    result = result.replace(':' + param, encodeURIComponent(params[param]));
  }

  // Second, replace glob params (*)
  if(Array.isArray(params)) {
    for(var n = 0; n < params.length; n++) {
      result = result.replace('*', encodeURIComponent(params[n]));
    }
  }

  if(result.match(/[\*:]/)) {
    throw new Error('There were unexpanded params: ' + result);
  }

  return result;
};
