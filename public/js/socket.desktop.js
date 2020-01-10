var socket = io();

var label = $('small');

var searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

var desktop = searchParams.get('escritorio');

$('h1').text('Escritorio ' + desktop);

$('button').on('click', function() {
    socket.emit('attendTicket', { desktop: desktop}, function(resp) {

        if (resp === 'No hay tickets'){
            label.text('No hay tickets');
            return;
        }

        label.text( 'Ticket ' + resp.number );

    });
});