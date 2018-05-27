import utils from "./utils";
import Handler from "./utils/handler";

module.exports = Rndr;

function Rndr(config) {
  var el = document.querySelector(config.el);
  var vh = new Handler();

  this.ext=function(obj, values) {
    var keys = Object.keys(values);
    var clone = {};
    keys.forEach(function(key) {
      clone[key] = values[key];
    });
    obj = Object.assign(obj, clone);
  }

  this.module=function(cb) {
    cb(vh, el);
    return vh;
  }

  this.update = function(obj){
    Object.keys(obj).forEach(function(key){
      var dt = vh.set(key,obj[key]);
      el.innerHTML = el.innerHTML.replace(dt.old,vh[key]);
    });
  }

  this.render=function(viewHandler) {
    var keyRegex = /\{\{(.+)\}\}/g;
    var elString = String(el.innerHTML);
    let tokensList = elString.match(keyRegex);
    var handlerKeys = tokensList.map(function(token) {
      return token.replace(/[{}]/g, "");
    });

    utils.onClickWrapper(el);

    handlerKeys.forEach(function(key) {
      var value;
      var getRef = utils.get(viewHandler, key.replace("()", ""));
      if (getRef) {
        value = getRef;
      } else {
        if (utils.noQuotes(key)) {
          value = `{{${key}}}`;
        } else {
          value = key.replace(/["']/g, "");
        }
      }
      if (typeof getRef == "function") {
        value = getRef();
      }

      let compiled = el.innerHTML.replace(`{{${key}}}`, value);
      el.innerHTML = compiled;
    });
  }
}
