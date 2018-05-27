function Handler(){
}

Handler.prototype.set = function (key,value) {
    var oldValue = this[key];
    this[key] = value;
    return {
      old: oldValue,
      key:key
    };
};

module.exports = Handler;
