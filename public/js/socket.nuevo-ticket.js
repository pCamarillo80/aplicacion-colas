//Comando para establecer la conexion 

var socket = io();
var label = $('#lblNuevoTicket');
//escucha
socket.on('connect', function() {
    console.log('Conectado al servidor');
});
//escucha
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', function(resp) {
    label.text(resp.estadoActual);
});

$('button').on('click', function() {
    console.log('click');

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });


});