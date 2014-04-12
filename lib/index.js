// Generated by LiveScript 1.2.0
/** ^
 * Copyright (c) 2013 Quildreen Motta
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(){
  var Validation, Success, Failure;
  Validation = (function(){
    Validation.displayName = 'Validation';
    var prototype = Validation.prototype, constructor = Validation;
    function Validation(){}
    prototype.Failure = function(a){
      return new Failure(a);
    };
    prototype.Success = function(b){
      return new Success(b);
    };
    prototype.fromNullable = function(a){
      switch (false) {
      case a == null:
        return new Success(a);
      default:
        return new Failure(a);
      }
    };
    prototype.isFailure = false;
    prototype.isSuccess = false;
    prototype.of = function(b){
      return new Success(b);
    };
    prototype.ap = function(_){
      throw Error('unimplemented');
    };
    prototype.map = function(_){
      throw Error('unimplemented');
    };
    prototype.toString = function(){
      throw Error('unimplemented');
    };
    prototype.isEqual = function(_){
      throw Error('unimplemented');
    };
    prototype.get = function(){
      throw Error('unimplemented');
    };
    prototype.getOrElse = function(_){
      throw Error('unimplemented');
    };
    prototype.orElse = function(_){
      throw Error('unimplemented');
    };
    prototype.merge = function(){
      return this.value;
    };
    prototype.fold = curry$(function(f, g){
      throw Error('unimplemented');
    });
    prototype.swap = function(){
      throw Error('unimplemented');
    };
    prototype.bimap = curry$(function(f, g){
      throw Error('unimplemented');
    });
    prototype.failureMap = function(f){
      throw Error('unimplemented');
    };
    prototype.leftMap = function(f){
      return this.failureMap(f);
    };
    return Validation;
  }());
  Success = (function(superclass){
    var prototype = extend$((import$(Success, superclass).displayName = 'Success', Success), superclass).prototype, constructor = Success;
    function Success(value){
      this.value = value;
    }
    prototype.isSuccess = true;
    prototype.ap = function(b){
      switch (false) {
      case !b.isFailure:
        return b;
      default:
        return b.map(this.value);
      }
    };
    prototype.map = function(f){
      return this.of(f(this.value));
    };
    prototype.toString = function(){
      return "Validation.Success(" + this.value + ")";
    };
    prototype.isEqual = function(a){
      return a.isSuccess && a.value === this.value;
    };
    prototype.get = function(){
      return this.value;
    };
    prototype.getOrElse = function(_){
      return this.value;
    };
    prototype.orElse = function(_){
      return this;
    };
    prototype.fold = function(_, g){
      return g(this.value);
    };
    prototype.swap = function(){
      return new Failure(this.value);
    };
    prototype.bimap = function(_, g){
      return new Success(g(this.value));
    };
    prototype.failureMap = function(_){
      return this;
    };
    return Success;
  }(Validation));
  Failure = (function(superclass){
    var prototype = extend$((import$(Failure, superclass).displayName = 'Failure', Failure), superclass).prototype, constructor = Failure;
    function Failure(value){
      this.value = value;
    }
    prototype.isFailure = true;
    prototype.ap = function(b){
      switch (false) {
      case !b.isFailure:
        return new Failure(this.value.concat(b.value));
      default:
        return this;
      }
    };
    prototype.map = function(_){
      return this;
    };
    prototype.toString = function(){
      return "Validation.Failure(" + this.value + ")";
    };
    prototype.isEqual = function(a){
      return a.isFailure && a.value === this.value;
    };
    prototype.get = function(){
      throw new TypeError("Can't extract the value of a Failure(a)");
    };
    prototype.getOrElse = function(a){
      return a;
    };
    prototype.orElse = function(f){
      return f(this.value);
    };
    prototype.fold = function(f, _){
      return f(this.value);
    };
    prototype.swap = function(){
      return new Success(this.value);
    };
    prototype.bimap = function(f, _){
      return new Failure(f(this.value));
    };
    prototype.failureMap = function(f){
      return new Failure(f(this.value));
    };
    return Failure;
  }(Validation));
  module.exports = new Validation;
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);