  x= prompt();
  y= prompt();
  
  
  function compare (a, b) {
    var y = a.toLowerCase().split("").sort().join(""),
        z = b.toLowerCase().split("").sort().join("");
    alert(z == y
        ? true
        : false
    );
  }

compare(x,y)
