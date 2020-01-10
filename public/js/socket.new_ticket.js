// Enable connection
var socket = io();

let label = $('#lblNuevoTicket'); // reference to label in HTML

socket.on('connect', function() {
    console.log('Connected to server');
});


socket.on('disconnect', function() {
    console.log('Disonnected from server');
});

socket.on('actualState', function(resp) {
    label.text(resp.actual);
});

$('button').on('click', function() {
    socket.emit('nextTicket',null, function(nextTicket){
        label.text(nextTicket);
    });
});