/* jshint undef: true, unused: true */
/* globals jQuery, window */

(function(win, ns, $, undefined) {
    'use strict'

    var namespace = win[ns] || {}
    win[ns] = namespace

    console.log('init js')

    var fetchRepos = function($el) {
        var limit = $el.data('limit')
        var offset = $el.data('offset')

        $.get('/repo', {
            limit: limit,
            offset: offset
        },
        function(data) {
            $el.remove()
            var newItem = namespace.render('repo', data)
            $('#repos-wrapper').append(newItem)
            namespace.autoFetcher.initialize()

        }).fail(function(error) {
            console.error( error )
        })
    }

    namespace.autoFetcher = {
        initialize: function() {
            $('#fetcher').waypoint({
                handler: function(direction) {
                    if($(this.element).data('initialized')) {
                        return
                    }
                    $(this.element).data('initialized', true)
                    if (direction === 'down') {
                        console.log('scroll to waypoint')
                        fetchRepos($(this.element))
                        this.destroy()
                    }
                },
                offset: $(window).height() + 200,
                context: window
            })
        }
    }
    namespace.autoFetcher.initialize()

})(window, 'homework', jQuery)
/* jshint undef: true, unused: true */
/* globals jQuery, window, HBTemplates */

;(function(win, ns, $, undefined) {
	'use strict'

	var namespace = win[ns] || {}
    win[ns] = namespace

	namespace.render = function(name, data) {
        return HBTemplates[name](data)
    }

})(window, 'homework', jQuery)