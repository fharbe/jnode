$ = function(selector, context) {
	var $ = {
		init: function(selector, context) {
			// domelement && all other queries | modern browsers only!
			// no function so its a string or undefined / null => return $
			// next set the objects to a new Array
			// if its a DOMnode, add it to the Objects Array
			// if no context is defined, set context to document
			// use querySelectorAll to get classes, ids etc.
			// if this is true, return the $ Object else it is a function so return the $.ready(selector)
			//return !$.isfn(selector) && ($.O = selector.nodeType ? selector : (!context ? document : context).querySelectorAll(selector)) ? $ : $.ready(selector);
			return !$.isfn(selector) && (selector.nodeType && (($.O = [])[0] = selector) || ($.O = (!context ? document : context).querySelectorAll(selector))) ? $ : $.ready(selector);
		},
		ready: function(cb) {
			// using var for function scope
			var dcl = 'DOMContentLoaded';
			$.init(document).bind(dcl, onload = function() {
				// no need for $.init(document) because the node is already in $.O
				$.unbind(dcl, onload = null);
				// using passing $ as first argument to use this as the $ object
				// second argument to use $ function-like
				cb.call($, $.init);
			});
		},
		isfn: function(fn) {
			// not jquery like, but works ;)
			return typeof fn == 'function';
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
		bind: function(e, cb) {
			return $.each(function() {
				(this.a = this.addEventListener) && this.a(e, cb, 0) || (this.a = this.attachEvent) && this.a('on' + e, cb);
			});
		},
		unbind: function(e, cb) {
			return $.each(function() {
				(this.r = this.removeEventListener) && this.r(e, cb, 0) || (this.r = this.detachEvent) && this.r('on' + e, cb);
			});
		}
	};
	return $.init(selector, context);
};