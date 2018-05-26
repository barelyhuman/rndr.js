const utils = {
  get: function(obj, path) {
    return path.split(".").reduce(function(o, k) {
      return o && o[k] ? o[k] : undefined;
    }, obj);
  },
  noQuotes:function(str){
      var regex=/^['"](.)['"]$/g;
      if(str.match(regex)){
        return false;
      }
      return true;
  }
};

module.exports = utils;
