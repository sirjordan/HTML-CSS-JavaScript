	

     
    Array.prototype.square = function(){
      var result = new Array();
      for(var i = 0; i < this.length; i++){
          result[i] = this[i] * this[i];
      }
      return result;
    }
     
    Array.prototype.cube = function(){
      var result = new Array();
      for(var i = 0; i < this.length; i++){
          result[i] = Math.pow(this[i], 3);
      }
      return result;
      }
     
    Array.prototype.sum = function(){
      var result = 0;
      for(var i = 0; i < this.length; i++){
          result += this[i];
      }
      return result;
    }
     
    Array.prototype.odd = function(){
      var result = new Array();
      for(var i = 0; i < this.length; i++){
          if(this[i] % 2 != 0){
            result.push(this[i]);
          }
      }
      return result;
    }
     
    Array.prototype.even = function(){
      var result = new Array();
      for(var i = 0; i < this.length; i++){
          if(this[i] % 2 == 0){
            result.push(this[i]);
          }
      }
      return result;
      }
     
    Array.prototype.average = function(){
    if(this.length < 1){
        return NaN;
      }else{
        return this.sum() / this.length;
      }
    }

