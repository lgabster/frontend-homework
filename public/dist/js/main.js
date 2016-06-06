(function(win, ns, $, undefined) {
    var namespace = window[ns] || {};
    window[ns] = namespace;

    console.log('init js')

    $("#getrepos").click(function(){
        console.log('click')
        $.get("/repo?limit=5&offset=20",
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        }).fail(function(error) {
            alert( error );
        });
    });

    $('#waypoint').waypoint({
        handler: function(direction) {
            if (direction === 'down') {
                console.log('Scrolled to waypoint! ' + direction)
            }
        },
        offset: '200%'
    })

})(window, 'homework', jQuery)