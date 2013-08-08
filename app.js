$ = function(cb) {
	var dcl = 'DOMContentLoaded';
	var $ = {
		init: function(selector, context) {
			// domelement && all other queries | modern browsers only!
			// no function so its a string or undefined / null => return $
			// next set the objects to a new Array
			// if its a DOMnode, add it to the Objects Array
			// if no context is defined, set context to document
			// use querySelectorAll to get classes, ids etc.
			// if this is true, return the $ Object else it is a function so return the $.ready(selector)
			selector.nodeType && (($.O = [])[0] = selector) || ($.O = (!context ? document : context).querySelectorAll(selector));
			return $;
		},
		each: function(cb) {
			// adapted from jquery && // using var for function scope
			for (var i = 0; i < $.O.length; i++) cb.call($.O[i], i);
			return $;
		},
		attr: function(name, val) {
			return $.each(function() {
				this.setAttribute(name, val);
			});
		},
		bind: (function() {
			if (document.addEventListener) {
				return function(e, cb) {
					return $.each(function() {
						this.addEventListener(e, cb, 0);
					});
				};
			} else {
				return function(e, cb) {
					return $.each(function() {
						this.attachEvent('on' + e, cb);
					});
				};
			}
		})(),
		unbind: (function() {
			if (document.addEventListener) {
				return function(e, cb) {
					return $.each(function() {
						this.removeEventListener(e, cb, 0);
					});
				};
			} else {
				return function(e, cb) {
					return $.each(function() {
						this.detachEvent('on' + e, cb);
					});
				};
			}
		})()
	};
	$.init(document).bind(dcl, onload = function() {
		// no need for $.init(document) because the node is already in $.O
		$.unbind(dcl, onload = null);
		// using passing $ as first argument to use this as the $ object
		// second argument to use $ function-like
		cb.call($, $.init);
	});
};