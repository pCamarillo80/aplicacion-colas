var socket = io();

//escucha
socket.on('connect', function() {
    console.log('Conectado al servidor');
});
//escucha
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log('escritorio', escritorio);

$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets pendientes por atender') {
            label.text(resp);
            return;
        }

        console.log('Ticket' + resp.numero);

        label.text('Ticket' + resp.numero);

    });


});