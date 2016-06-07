/* jshint undef: true, unused: true */
/* globals jQuery, window, Handlebars */

;(function(win, ns, $, undefined) {
	'use strict'

	var namespace = win[ns] || {};
    win[ns] = namespace;

	namespace.render = function(name, data) {
        return HBTemplates[name](data)
    };

})(window, 'homework', jQuery)