function to_bin(num){
    if(num >= 1){
        return to_bin(Math.floor(num/2))+(num % 2);
    } 
    return '';
}