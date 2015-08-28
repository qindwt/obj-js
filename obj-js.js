/* js 实现对象继承工具类
 * qinning 383175101@qq.com
 * Apache License Version 2.0
 */
(function(W) {
	"use strict";
	var Class = function() {
	};
	// 实现super
	Class.prototype._super = function() {
	};
	Class.prototype.init = function() {
	};
	// 继承函数实现方法
	function _extend(p) {
		var pt = new this();
		for ( var name in p) {
			// 属性不能包含_super保留字段
			if (/\b_super\b/.test(name)) {
				if (console && typeof console.error == "function") {
					console.error("_super是保留字段不支持！");
				}
				continue;
			}
			// 针对函数类型，实现父类super
			if (typeof pt[name] == "function" && typeof p[name] == "function") {
				var tmpPt = pt[name];
				pt[name] = function() {
					var superTmp = this._super;
					this._super = tmpPt;
					p[name].apply(this, arguments);
					this._super = superTmp;
				}
			} else {
				pt[name] = p[name];
			}
		}
		var C = function() {
			if (this.init) {
				this.init.apply(this, arguments);
			}
		}
		// 使用C作为构造函数，初始化执行init
		pt.constructor = C;
		C.prototype = pt;
		C.extend = _extend;
		C.create = function(p) {
			return new C(p);
		}
		return C;
	}
	Class.extend = _extend;
	W.Class = Class;
})(window);