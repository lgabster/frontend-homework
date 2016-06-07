/* jshint undef: true, unused: true */
/* globals jQuery, window */

(function(win, ns, $, undefined) {
    'use strict'

    var namespace = win[ns] || {}
    win[ns] = namespace

    console.log('init js')

    $('#fetcher').waypoint({
        element: this,
        handler: function(direction) {
            console.log('scroll to waypoint')
            if (direction === 'down') {
                fetchRepos()
            }
        },
        offset: $(window).height() + 200,
        context: window
    })

    var fetchRepos = function() {
        $.get('/repo', {
            limit: 10,
            offset: 20
        },
        function(data, status) {
            $.each(data.repos, function(i, repo) {
                var newItem = namespace.render('repo', repo)
                $('#repos-wrapper').append(newItem)
            })
        }).fail(function(error) {
            console.error( error )
        })
    }

})(window, 'homework', jQuery)
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