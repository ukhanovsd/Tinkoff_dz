var bnd = function(fun, smth) {
  var bndArgs = [].slice.call(arguments, 2);
  return function() {
    var funArgs = [].slice.call(arguments);
    return fun.apply(smth, bndArgs.concat(funArgs));
  };
};

var user = {
  uname: "Вася",
  greet: function() {
    return ('Привет, ' + this.uname);
  }
};

var greet = bnd(user.greet, user);
console.log(greet());