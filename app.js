(function() {
	_$ = {
		o: [],
		init: function(selector, context) {
			// domelement && all other queries | modern browsers only!
			// no function so its a string or undefined / null => return _$
			// next set the objects to a new Array
			// if its a DOMnode, add it to the Objects Array
			// if no context is defined, set context to document
			// if its an id, use getElementById because its faster (using context beacuse its shorter when compressed)
			// if its not an id, use querySelectorAll to get classes etc.
			// if this is true, return the _$ Object else it is a function so return the _$.ready(selector)
			selector && (_$.o = []);
			!context && (context = document);
			return !_$.isfn(selector) && (!selector || selector.nodeType && _$.o.push(selector) || /^#/.test(selector) && _$.o.push(context.getElementById(selector)) || (_$.o = context.querySelectorAll(selector))) ? _$ : _$.ready(selector);
		},
		isfn: function(fn) {
			// not jquery like, but works ;)
			return typeof fn === 'function';
		},
		each: function(fn) {
			// adapted from jquery
			for (i = 0; i < _$.o.length; i++) { fn.call(_$.o[i]); }
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
			_$.each(function(o) {
				// test if its available else return false / 0 (to use window.onload...)
				return ((o = this).rm = o.removeEventListener) && o.rm(e, fn, 0) ? _$ : 0;
			});
		},
		ready: function(fn) {
			dcl = 'DOMContentLoaded';
			fire = function(e) {
				// unbind the listeners
				!$(document).unbind(dcl, fire) && (window.onload = null);
				// not using call...
				fn.call(_$, $);
			};
			// if its not available use window.onload
			!$(document).bind(dcl, fire) && (window.onload = fire);
		}
	};
	// haha too simple...
	$ = _$.init;
})();