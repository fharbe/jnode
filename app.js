(function() {
	_$ = {
		o: [],
		init: function(selector, context) {
			// domelement && all other queries | modern browsers only!
			// no function so its a string or undefined / null => return _$
			// next set the objects to a new Array
			// if its a DOMnode, add it to the Objects Array
			// if no context is defined, set context to document
			// use querySelectorAll to get classes, ids etc.
			// if this is true, return the _$ Object else it is a function so return the _$.ready(selector)
			return !_$.isfn(selector) && (selector.nodeType && (_$.o = []).push(selector) || (_$.o = (!context ? document : context).querySelectorAll(selector))) ? _$ : _$.ready(selector);
		},
		ready: function(fn) {
			dcl = 'DOMContentLoaded';
			fire = function() {
				// unbind the listeners
				!$(document).unbind(dcl, fire) && (window.onload = null);
				// using call like jquery
				fn.call(_$, $);
			};
			// if its not available use window.onload
			!$(document).bind(dcl, fire) && (window.onload = fire);
		},
		isfn: function(fn) {
			// not jquery like, but works ;)
			return typeof fn === 'function';
		},
		each: function(fn) {
			// adapted from jquery
			for (i = 0; i < _$.o.length; i++) { fn.call(_$.o[i], i); }
		},
		attr: function(name, val) {
			_$.each(function() {
				// maybe not right here to return each time, but works with single nodes
				o = this;
				return val && o.setAttribute(name, val) ? _$ : o.getAttribute(name);
			});
		},
		bind: function(e, fn) {
			_$.each(function() {
				// test if its available else return false / 0 (to use window.onload...)
				return ((o = this).add = o.addEventListener) && o.add(e, fn, 0) ? _$ : 0;
			});
		},
		unbind: function(e, fn) {
			_$.each(function() {
				// test if its available else return false / 0 (to use window.onload...)
				return ((o = this).rm = o.removeEventListener) && o.rm(e, fn, 0) ? _$ : 0;
			});
		}
	};
	// haha too simple...
	$ = _$.init;
})();