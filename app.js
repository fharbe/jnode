$ = function(selector, context) {
	return ($ = {
		init: function(selector, context) {
			// domelement && all other queries | modern browsers only!
			// no function so its a string or undefined / null => return $
			// next set the objects to a new Array
			// if its a DOMnode, add it to the Objects Array
			// if no context is defined, set context to document
			// use querySelectorAll to get classes, ids etc.
			// if this is true, return the $ Object else it is a function so return the $.ready(selector)
			return !$.isfn(selector) && (selector.nodeType && ($.O = []).push(selector) || ($.O = (!context ? document : context).querySelectorAll(selector))) ? $ : $.ready(selector);
		},
		ready: function(fn) {
			// dual bind the "fire" function
			var dcl = 'DOMContentLoaded';
			$.init(document).bind(dcl, onload = function() {
				$.init(document).unbind(dcl, onload = null);
				// using call like jquery
				fn.call($, $.init);
			});
		},
		isfn: function(fn) {
			// not jquery like, but works ;)
			return typeof fn == 'function';
		},
		each: function(fn) {
			// adapted from jquery
			for (var i = 0; i < $.O.length; i++) {
				fn.call(i, $.O[i]);
			}
		},
		attr: function(name, val) {
			$.each(function(c) {
				c.setAttribute(name, val)
			});
			return $;
		},
		bind: function(e, fn) {
			$.each(function(c) {
				(c.add = c.addEventListener) && c.add(e, fn, 0);
			});
			return $;
		},
		unbind: function(e, fn) {
			$.each(function(c) {
				(c.rm = c.removeEventListener) && c.rm(e, fn, 0);
			});
			return $;
		}
	}).init(selector, context);
};