const _ = {
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

function Rndr(config) {
  this.el = document.querySelector(config.el);

  this.ext = function(obj, values) {
    var keys = Object.keys(values);
    var clone = {};
    keys.forEach(function(key) {
      clone[key] = values[key];
    });
    obj = Object.assign(obj, clone);
  };

  this.module = function(cb) {
    let vh = {};
    cb(vh, this.el);
    return vh;
  };

  this.render = function(viewHandler) {
    var keyRegex = /\{\{(.+)\}\}/g;
    var elString = String(this.el.innerHTML);
    let tokensList = elString.match(keyRegex);
    var handlerKeys = tokensList.map(function(token) {
      return token.replace(/[{}]/g, "");
    });
    handlerKeys.forEach(function(key) {
      var value;
      var getRef = _.get(viewHandler, key.replace("()", ""));
      if(getRef){
        value = getRef;
      }
      else{
        if(_.noQuotes(key)){
          value = `{{${key}}}`
        }else{
            value = key.replace(/["']/g, "");
        }
      }
      if (typeof getRef == "function") {
        value = getRef();
      }
      let compiled = this.el.innerHTML.replace(`{{${key}}}`, value);
      this.el.innerHTML = compiled;
    });
  };

  return this;
}

window.Rndr = Rndr;
