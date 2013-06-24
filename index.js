module.exports = function(pattern, params) {
  var result = pattern;

  for(var param in params) {
    var array_index = params[param] == params[+param];
    if(!array_index) {
      result = result.replace(new RegExp(':' + param), encodeURIComponent(params[param]));
    }
  }

  if(Array.isArray(params)) {
    for(var n = 0; n < params.length; n++) {
      result = result.replace('*', encodeURIComponent(params[n]));
    }
  }

  return result;
};
