	function intersect(x, y)
{

	var res_ = [];
  	var xi=0, yi=0;
  

  while( xi < x.length && yi < y.length )
  {
     if      (x[xi] < y[yi] ){ xi++; }
     else if (x[xi] > y[yi] ){ xi++; }
     else /* they're equal */
     {
       res_.push(x[xi]);
       xi++; yi++;
     }
  }

  return res_;
}