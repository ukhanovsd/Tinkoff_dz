  x= prompt();
  y= prompt();
  
  
  function compare (a, b) {
    var y = a.split("").sort().join(""),
        z = b.split("").sort().join("");
    alert(z === y
        ? a + " and " + b + " are anagrams!"
        : a + " and " + b + " are not anagrams."
    );
  }

compare(x,y)

