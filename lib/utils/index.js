const utils = {
  get: function(obj, path) {
    return path.split(".").reduce(function(o, k) {
      return o && o[k] ? o[k] : undefined;
    }, obj);
  },
  noQuotes: function(str) {
    var regex = /^['"](.)['"]$/g;
    if (str.match(regex)) {
      return false;
    }
    return true;
  },
  onClickWrapper: function(el) {
    el.querySelectorAll("*").forEach(function(node) {
      const parent = node.parentElement;
      if (node.attributes && node.hasAttribute("@click")) {
        var key = node.getAttribute("@click");
        var nodeClone = node.cloneNode(true);
        parent.removeChild(node)
        nodeClone.onclick = function(){
          alert('hello');
        }
        parent.appendChild(nodeClone);
      }
    });
  }
};

module.exports = utils;
